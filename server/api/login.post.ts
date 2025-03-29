import { compare } from "bcrypt";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = bodySchema.parse(body);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name ?? "",
      avatar: user.avatar ?? "",
    },
  });

  return { message: "Login successful" };
});

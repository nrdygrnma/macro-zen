import { hash } from "bcrypt";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  avatar: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, name, avatar } = bodySchema.parse(body);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: "Email already in use",
    });
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      avatar,
    },
  });

  return { message: "User registered successfully" };
});

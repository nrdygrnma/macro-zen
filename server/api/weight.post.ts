import { z } from "zod";
import { AuthUser } from "~/types/auth";

const schema = z.object({
  weight: z.number(),
  date: z.string().optional(), // accept optional date
});

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const user = session.user as AuthUser;
  const { weight, date } = schema.parse(await readBody(event));

  return prisma.weightEntry.create({
    data: {
      weight,
      userId: user.id,
      date: date ? new Date(date) : undefined,
    },
  });
});

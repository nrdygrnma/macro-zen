import { AuthUser } from "~/types/auth";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const user = session.user as AuthUser;

  return prisma.weightEntry.findMany({
    where: { userId: user.id },
    orderBy: { date: "asc" },
  });
});

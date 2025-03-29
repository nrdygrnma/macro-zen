import { AuthUser } from "~/types/auth";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const user = session.user as AuthUser;

  const weightEntries = await prisma.weightEntry.findMany({
    where: { userId: user.id },
    orderBy: { date: "asc" },
  });

  return weightEntries.map((entry) => ({
    date: entry.date.toISOString().split("T")[0],
    weight: entry.weight,
  }));
});

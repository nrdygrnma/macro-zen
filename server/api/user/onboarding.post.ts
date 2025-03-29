import { z } from "zod";
import type { AuthUser } from "~/types/auth"; // your user session type

const schema = z.object({
  weight: z.number(),
  goalWeight: z.number(),
  age: z.number(),
  height: z.number(),
  sex: z.string(),
  activity: z.string(),
  goal: z.string(),
  fasting: z.boolean(),
  fastingMethod: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const user = session.user as AuthUser;

  const body = await readBody(event);
  const data = schema.parse(body);

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...data,
      onboardingDone: true,
    },
  });

  await setUserSession(event, {
    user: updated,
  });

  return { message: "Onboarding saved", user: updated };
});

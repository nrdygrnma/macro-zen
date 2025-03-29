export const useUserStore = defineStore("user", () => {
  const weight = ref<number | null>(null);
  const goalWeight = ref<number | null>(null);
  const age = ref<number | null>(null);
  const height = ref<number | null>(null);
  const sex = ref<"male" | "female" | "other" | "">("");
  const activity = ref("");
  const goal = ref("");
  const fasting = ref(false);
  const fastingMethod = ref("16:8");

  return {
    weight,
    goalWeight,
    age,
    height,
    sex,
    activity,
    goal,
    fasting,
    fastingMethod,
  };
});

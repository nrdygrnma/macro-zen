import type { UserOnboardingData } from "~/types/onboarding";

export const useUserStore = defineStore("user", () => {
  const weight = ref<number | null>(null);
  const goalWeight = ref<number | null>(null);
  const age = ref<number | null>(null);
  const height = ref<number | null>(null);
  const sex = ref<"male" | "female" | "other" | "">("");
  const activity = ref("");
  const goal = ref("");
  const fasting = ref(false);
  const fastingMethod = ref<"16:8" | "18:6" | "20:4">("16:8");

  const setFromForm = (data: Partial<UserOnboardingData>) => {
    weight.value = data.weight ?? null;
    goalWeight.value = data.goalWeight ?? null;
    age.value = data.age ?? null;
    height.value = data.height ?? null;
    sex.value = data.sex ?? "";
    activity.value = data.activity ?? "";
    goal.value = data.goal ?? "";
    fasting.value = data.fasting ?? false;
    fastingMethod.value = data.fastingMethod ?? "16:8";
  };

  const getData = (): UserOnboardingData => ({
    weight: weight.value,
    goalWeight: goalWeight.value,
    age: age.value,
    height: height.value,
    sex: sex.value,
    activity: activity.value,
    goal: goal.value,
    fasting: fasting.value,
    fastingMethod: fastingMethod.value,
  });

  const saveProgress = (step: number) => {
    localStorage.setItem(
      "onboarding-progress",
      JSON.stringify({
        step,
        data: getData(),
      }),
    );
  };

  const loadProgress = () => {
    const saved = localStorage.getItem("onboarding-progress");
    if (!saved) return null;
    const { step, data } = JSON.parse(saved);
    setFromForm(data);
    return step;
  };

  const reset = () => {
    weight.value = null;
    goalWeight.value = null;
    age.value = null;
    height.value = null;
    sex.value = "";
    activity.value = "";
    goal.value = "";
    fasting.value = false;
    fastingMethod.value = "16:8";

    localStorage.removeItem("onboarding-progress");
  };

  const submitOnboarding = async () => {
    try {
      await useFetch("/api/user/onboarding", {
        method: "POST",
        body: {
          weight: weight.value,
          goalWeight: goalWeight.value,
          age: age.value,
          height: height.value,
          sex: sex.value,
          activity: activity.value,
          goal: goal.value,
          fasting: fasting.value,
          fastingMethod: fastingMethod.value,
        },
      });
    } catch (error) {
      throw new Error("Failed to submit onboarding data");
    }
  };

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
    setFromForm,
    saveProgress,
    loadProgress,
    reset,
    getData,
    submitOnboarding,
  };
});

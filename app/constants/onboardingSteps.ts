import type { Ref } from "vue";
import StepWelcome from "~/components/onboarding/StepWelcome.vue";
import StepWeight from "~/components/onboarding/StepWeight.vue";
import StepBasicInfo from "~/components/onboarding/StepBasicInfo.vue";
import StepActivity from "~/components/onboarding/StepActivity.vue";
import StepGoal from "~/components/onboarding/StepGoal.vue";
import StepFasting from "~/components/onboarding/StepFasting.vue";
import StepSummary from "~/components/onboarding/StepSummary.vue";

export function getOnboardingSteps(stepRef: Ref<any>) {
  return [
    {
      title: "Welcome",
      icon: "mdi:hand-wave",
      component: StepWelcome,
    },
    {
      title: "Weight",
      icon: "mdi:scale-bathroom",
      component: StepWeight,
      focusRef: () => stepRef.value?.weightInput,
    },
    {
      title: "Basic Info",
      icon: "mdi:account-details",
      component: StepBasicInfo,
      focusRef: () => stepRef.value?.ageInput,
    },
    {
      title: "Activity",
      icon: "mdi:run",
      component: StepActivity,
      focusRef: () => stepRef.value?.activityRef,
    },
    {
      title: "Goal",
      icon: "mdi:bullseye-arrow",
      component: StepGoal,
      focusRef: () => stepRef.value?.goalRef,
    },
    {
      title: "Fasting",
      icon: "mdi:timer-outline",
      component: StepFasting,
      focusRef: () => stepRef.value?.fastingRef,
    },
    {
      title: "Summary",
      icon: "mdi:clipboard-check-outline",
      component: StepSummary,
    },
  ];
}

<template>
  <UContainer
    class="w-full max-w-xl mx-auto p-8 border border-gray-200 rounded-lg"
  >
    <UStepper :items="stepItems" :model-value="step" class="w-full mb-8" />

    <div class="min-h-[300px]">
      <component :is="currentStepComponent" ref="stepRef" />
    </div>

    <OnboardingNavigation
      :can-continue="Boolean(canContinue)"
      :max-step="maxStep"
      :step="step"
      @back="prevStep"
      @next="nextStep"
    />
  </UContainer>
</template>

<script lang="ts" setup>
import StepWelcome from "~/components/onboarding/StepWelcome.vue";
import StepWeight from "~/components/onboarding/StepWeight.vue";
import StepBasicInfo from "~/components/onboarding/StepBasicInfo.vue";
import StepActivity from "~/components/onboarding/StepActivity.vue";
import StepGoal from "~/components/onboarding/StepGoal.vue";
import StepSummary from "~/components/onboarding/StepSummary.vue";
import StepFasting from "~/components/onboarding/StepFasting.vue";
import { useOnboardingValidation } from "~/composables/useOnboardingValidation";

definePageMeta({
  layout: "onboarding",
});

const steps = [
  { title: "Welcome", icon: "mdi:hand-wave", component: StepWelcome },
  { title: "Weight", icon: "mdi:scale-bathroom", component: StepWeight },
  {
    title: "Basic Info",
    icon: "mdi:account-details",
    component: StepBasicInfo,
  },
  { title: "Activity", icon: "mdi:run", component: StepActivity },
  { title: "Goal", icon: "mdi:bullseye-arrow", component: StepGoal },
  { title: "Fasting", icon: "mdi:timer-outline", component: StepFasting },
  {
    title: "Summary",
    icon: "mdi:clipboard-check-outline",
    component: StepSummary,
  },
];

const toast = useToast();
const router = useRouter();
const user = useUserStore();

const step = ref(0);
const stepRef = ref();
const maxStep = steps.length - 1;

const isStepValid = useOnboardingValidation(user);
const stepItems = steps.map(({ title, icon }) => ({ title, icon }));

useAutoStepFocus(step, {
  1: computed(() => stepRef.value?.weightInput),
  2: computed(() => stepRef.value?.ageInput),
  3: computed(() => stepRef.value?.activityRef),
  4: computed(() => stepRef.value?.goalRef),
  5: computed(() => stepRef.value?.fastingRef),
});

const canContinue = computed(() => isStepValid(step.value));
const currentStepComponent = computed(() => steps[step.value]!.component);

const prevStep = () => {
  step.value--;
};

const nextStep = () => {
  if (step.value < maxStep) {
    step.value++;
  } else {
    toast.add({
      title: "Welcome to MacroZen 🎉",
      description: "Setup complete!",
      color: "success",
    });
    user.reset();
    router.push("/");
  }
};

watch(
  [step, user],
  () => {
    user.saveProgress(step.value);
  },
  { deep: true },
);

onMounted(() => {
  user.loadProgress();
});
</script>

<template>
  <UContainer class="w-full p-8 border border-gray-200 rounded-lg">
    <UStepper
      :items="stepItems"
      :model-value="step"
      @update:model-value="handleStepClick"
    />

    <div class="min-h-[300px] mt-8">
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
import { useAutoStepFocus } from "~/composables/onboarding/useAutoStepFocus";
import { useOnboardingValidation } from "~/composables/onboarding/useOnboardingValidation";
import { useStepperNavigation } from "~/composables/onboarding/useStepperNavigation";
import { getOnboardingSteps } from "~/constants/onboardingSteps";

definePageMeta({
  layout: "onboarding",
});

const router = useRouter();
const toast = useToast();
const user = useUserStore();

const step = ref<number>(0);
const stepRef = ref();
const maxStep = 6;

const isStepValid = useOnboardingValidation(user);
const stepConfig = getOnboardingSteps(stepRef);

const stepItems = computed(() =>
  stepConfig.map(({ title, icon }, index) => ({
    title,
    icon,
    disabled:
      index > step.value &&
      !Array.from({ length: index }).every((_, i) => isStepValid(i)),
  })),
);

const currentStepComponent = computed(() => stepConfig[step.value]!.component);
const canContinue = computed(() => isStepValid(step.value));

useAutoStepFocus(
  step,
  stepConfig.reduce(
    (map, step, index) => {
      if (step.focusRef) map[index] = computed(step.focusRef);
      return map;
    },
    {} as Record<number, Ref<any>>,
  ),
);

const prevStep = () => {
  step.value--;
};

const nextStep = async () => {
  if (step.value < maxStep) {
    step.value++;
  } else {
    try {
      await user.submitOnboarding();

      toast.add({
        title: "Welcome to MacroZen 🎉",
        description: "Setup complete!",
        color: "success",
      });

      await router.push("/");
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Could not save onboarding data",
        color: "error",
      });
    }
  }
};

const handleStepClick = useStepperNavigation(step, (s) => !!isStepValid(s));

onMounted(() => {
  user.loadProgress();
});

watch(
  [step, user],
  () => {
    user.saveProgress(step.value);
  },
  { deep: true },
);
</script>

<template>
  <UContainer
    class="w-full max-w-xl mx-auto p-8 border border-gray-200 rounded-lg"
  >
    <UStepper :items="stepItems" :model-value="step" class="w-full mb-8" />

    <div class="min-h-[300px]">
      <div v-if="step === 0">
        <h2 class="text-2xl font-semibold mb-4">Welcome to MacroZen 👋</h2>
        <p class="text-gray-600 mb-6">
          Let's personalize your experience to help you reach your health goals.
        </p>
      </div>

      <div v-else-if="step === 1">
        <h2 class="text-xl font-semibold mb-4">Your Weight</h2>
        <UFormField class="mb-4" label="Current Weight (kg)">
          <UInput ref="weightInput" v-model="form.weight" type="number" />
        </UFormField>
        <UFormField label="Goal Weight (kg)">
          <UInput v-model="form.goalWeight" type="number" />
        </UFormField>
      </div>

      <div v-else-if="step === 2">
        <UFormField class="mb-4" label="Age">
          <UInput ref="ageInput" v-model="form.age" type="number" />
        </UFormField>
        <UFormField class="mb-4" label="Height (cm)">
          <UInput v-model="form.height" type="number" />
        </UFormField>
        <UFormField label="Sex">
          <URadioGroup v-model="form.sex" :items="genderItems" />
        </UFormField>
      </div>

      <div v-else-if="step === 3">
        <h2 class="text-xl font-semibold mb-4">Activity Level</h2>
        <URadioGroup
          ref="activityRef"
          v-model="form.activity"
          :items="activityItems"
        />
      </div>

      <div v-else-if="step === 4">
        <h2 class="text-xl font-semibold mb-4">Your Goal</h2>
        <URadioGroup ref="goalRef" v-model="form.goal" :items="goalItems" />
      </div>

      <div v-else-if="step === 5">
        <h2 class="text-xl font-semibold mb-4">Do You Fast?</h2>
        <USwitch ref="fastingRef" v-model="form.fasting" class="mb-4" />

        <div v-if="form.fasting">
          <UFormField label="Fasting Method">
            <USelect v-model="form.fastingMethod" :items="fastingItems" />
          </UFormField>
        </div>
      </div>

      <div v-else-if="step === 6">
        <h2 class="text-xl font-semibold mb-4">Summary</h2>
        <ul class="text-sm text-gray-700 space-y-1">
          <li><strong>Weight:</strong> {{ form.weight }} kg</li>
          <li><strong>Goal Weight:</strong> {{ form.goalWeight }} kg</li>
          <li><strong>Age:</strong> {{ form.age }}</li>
          <li><strong>Height:</strong> {{ form.height }} cm</li>
          <li><strong>Sex:</strong> {{ toTitleCase(form.sex) }}</li>
          <li><strong>Activity:</strong> {{ toTitleCase(form.activity) }}</li>
          <li><strong>Goal:</strong> {{ toTitleCase(form.goal) }}</li>
          <li>
            <strong>Fasting:</strong>
            {{ form.fasting ? form.fastingMethod : "No" }}
          </li>
        </ul>
      </div>
    </div>

    <div class="flex justify-between mt-2 min-h-[2rem]">
      <UButton :disabled="step === 0" variant="ghost" @click="prevStep">
        Back
      </UButton>
      <UButton :disabled="!canContinue" @click="nextStep">
        {{ step < maxStep ? "Next" : "Finish" }}
      </UButton>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import type { RadioGroupItem, StepperItem } from "@nuxt/ui";
import { toTitleCase } from "~/utils/textUtils";

definePageMeta({
  layout: "onboarding",
});

const user = useUserStore();
const weightInput = ref();
const ageInput = ref();
const activityRef = ref();
const goalRef = ref();
const fastingRef = ref();

const toast = useToast();
const router = useRouter();

const stepItems = ref<StepperItem[]>([
  {
    title: "Welcome",
    icon: "mdi:hand-wave",
  },
  {
    title: "Weight",
    icon: "mdi:scale-bathroom",
  },
  {
    title: "Basic Info",
    icon: "mdi:account-details",
  },
  {
    title: "Activity",
    icon: "mdi:run",
  },
  {
    title: "Goal",
    icon: "mdi:bullseye-arrow",
  },
  {
    title: "Fasting",
    icon: "mdi:timer-outline",
  },
  {
    title: "Summary",
    icon: "mdi:clipboard-check-outline",
  },
]);

const step = ref(0);
const maxStep = stepItems.value.length - 1;

useAutoStepFocus(step, {
  1: weightInput,
  2: ageInput,
  3: activityRef,
  4: goalRef,
  5: fastingRef,
});

const genderItems: RadioGroupItem[] = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Other", value: "other" },
];

const activityItems: RadioGroupItem[] = [
  { label: "Sedentary", value: "sedentary" },
  { label: "Lightly Active", value: "light" },
  { label: "Moderately Active", value: "moderate" },
  { label: "Very Active", value: "active" },
  { label: "Super Active", value: "super" },
];

const goalItems: RadioGroupItem[] = [
  { label: "Lose Weight", value: "lose" },
  { label: "Maintain Weight", value: "maintain" },
  { label: "Gain Muscle", value: "gain" },
];

const fastingItems: any[] = [
  { label: "16:8", value: "16:8" },
  { label: "18:6", value: "18:6" },
  { label: "20:4", value: "20:4" },
];

const form = reactive({
  weight: user.weight ?? null,
  goalWeight: user.goalWeight ?? null,
  age: user.age ?? null,
  height: user.height ?? null,
  sex: user.sex || "female",
  activity: user.activity || "sedentary",
  goal: user.goal || "maintain",
  fasting: user.fasting ?? false,
  fastingMethod: user.fastingMethod || "16:8",
});

const prevStep = () => {
  step.value--;
};

const nextStep = () => {
  if (step.value < maxStep) {
    Object.assign(user, form);
    step.value++;
  } else {
    toast.add({
      title: "Welcome to MacroZen 🎉",
      description: "Setup complete!",
      color: "success",
    });
    localStorage.removeItem("onboarding-progress");
    router.push("/");
  }
};

const canContinue = computed(() => {
  if (step.value === 0) return true;
  if (step.value === 1) return form.weight && form.goalWeight;
  if (step.value === 2) return form.age && form.height && form.sex;
  if (step.value === 3) return !!form.activity;
  if (step.value === 4) return !!form.goal;
  if (step.value === 5) return !form.fasting || !!form.fastingMethod;
  return true;
});

watch(
  [step, form],
  () => {
    localStorage.setItem(
      "onboarding-progress",
      JSON.stringify({
        step: step.value,
        data: { ...form },
      }),
    );
  },
  { deep: true },
);

onMounted(() => {
  const saved = localStorage.getItem("onboarding-progress");
  if (saved) {
    const { step: savedStep, data } = JSON.parse(saved);
    Object.assign(form, data);
    step.value = savedStep;
  }
});
</script>

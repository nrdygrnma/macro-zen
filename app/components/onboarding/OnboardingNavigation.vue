<template>
  <div class="flex justify-between mt-2 min-h-[2rem]">
    <UButton :disabled="isFirst" variant="ghost" @click="$emit('back')">
      Back
    </UButton>
    <UButton :disabled="!canContinue" @click="$emit('next')">
      {{ isLast ? "Finish" : "Next" }}
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const { step, maxStep, canContinue } = defineProps<{
  step: number;
  maxStep: number;
  canContinue: boolean;
}>();

const isFirst = computed(() => step === 0);
const isLast = computed(() => step === maxStep);
</script>

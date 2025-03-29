<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Your Goal</h2>

    <URadioGroup ref="goalRef" v-model="user.goal" :items="goalItems" />
  </div>
</template>

<script lang="ts" setup>
import type { RadioGroupItem } from "@nuxt/ui";

const user = useUserStore();
const goalRef = ref();

defineExpose({ goalRef });

const goalItems: RadioGroupItem[] = [
  { label: "Lose Weight", value: "lose" },
  { label: "Maintain Weight", value: "maintain" },
  { label: "Gain Muscle", value: "gain" },
];
</script>

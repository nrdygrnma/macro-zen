<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Activity Level</h2>

    <URadioGroup
      ref="activityRef"
      v-model="user.activity"
      :items="activityItems"
    />
  </div>
</template>

<script lang="ts" setup>
import type { RadioGroupItem } from "@nuxt/ui";

const user = useUserStore();
const activityRef = ref();

defineExpose({ activityRef });

const activityItems: RadioGroupItem[] = [
  { label: "Sedentary", value: "sedentary" },
  { label: "Lightly Active", value: "light" },
  { label: "Moderately Active", value: "moderate" },
  { label: "Very Active", value: "active" },
  { label: "Super Active", value: "super" },
];
</script>

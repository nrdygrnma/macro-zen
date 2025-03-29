<template>
  <div>
    <UFormField class="mb-4" label="Age">
      <UInput ref="ageInput" v-model="user.age" type="number" />
    </UFormField>

    <UFormField class="mb-4" label="Height (cm)">
      <UInput v-model="user.height" type="number" />
    </UFormField>

    <UFormField label="Sex">
      <URadioGroup v-model="user.sex" :items="genderItems" />
    </UFormField>
  </div>
</template>

<script lang="ts" setup>
import type { RadioGroupItem } from "@nuxt/ui";

const user = useUserStore();
const ageInput = ref();

defineExpose({ ageInput });

const genderItems: RadioGroupItem[] = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Other", value: "other" },
];
</script>

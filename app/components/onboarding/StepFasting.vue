<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Do You Fast?</h2>

    <USwitch ref="fastingRef" v-model="user.fasting" class="mb-4" />

    <div v-if="user.fasting">
      <UFormField label="Fasting Method">
        <USelect v-model="user.fastingMethod" :items="fastingItems" />
      </UFormField>
    </div>
  </div>
</template>

<script lang="ts" setup>
const user = useUserStore();
const fastingRef = ref();

defineExpose({ fastingRef });

const fastingItems = [
  { label: "16:8", value: "16:8" },
  { label: "18:6", value: "18:6" },
  { label: "20:4", value: "20:4" },
];
</script>

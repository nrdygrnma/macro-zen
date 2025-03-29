<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Your Weight</h2>
    <UFormField class="mb-4" label="Current Weight (kg)">
      <UInput ref="weightInput" v-model="user.weight" type="number" />
    </UFormField>
    <UFormField label="Goal Weight (kg)">
      <UInput v-model="user.goalWeight" type="number" />
    </UFormField>
  </div>
</template>

<script lang="ts" setup>
const user = useUserStore();
const weightInput = ref();

defineExpose({ weightInput });
</script>

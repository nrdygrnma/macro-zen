<template>
  <UCard>
    <template v-if="weightStore.loading">
      <div class="text-center py-12 text-gray-400">Loading chart…</div>
    </template>
    <template v-else> </template>
  </UCard>
</template>

<script lang="ts" setup>
import { useWeightStore } from "~/stores/weight";

const weightStore = useWeightStore();

onMounted(() => {
  // weightStore.fetchEntries();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>

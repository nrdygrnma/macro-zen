<template>
  <UCard>
    <template v-if="weightStore.loading">
      <div class="text-center py-12 text-gray-400">Loading chart…</div>
    </template>
    <template v-else>
      <v-chart :option="chartOptions" autoresize class="chart" />
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import { useWeightStore } from "~/stores/weight";

const weightStore = useWeightStore();
await weightStore.fetchWeights();

const chartOptions = computed(() => {
  const labels = weightStore.weights.map((entry) =>
    new Date(entry.date).toLocaleDateString(),
  );
  const data = weightStore.weights.map((entry) => entry.weight);
  return {
    title: {
      text: "Weight History",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: labels,
    },
    yAxis: {
      type: "value",
      name: "Weight (kg)",
    },
    series: [
      {
        name: "Weight",
        type: "line",
        smooth: true,
        data,
      },
    ],
  };
});

onMounted(async () => {
  await weightStore.fetchWeights();
});

watch(
  () => weightStore.weights,
  (val) => console.log("Weights in chart:", val),
  { immediate: true, deep: true },
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>

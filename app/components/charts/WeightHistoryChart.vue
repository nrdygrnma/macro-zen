<template>
  <UCard>
    <v-chart v-if="hasData" :option="chartOptions" autoresize class="chart" />
    <div v-else class="text-center text-sm text-gray-500 py-12">
      No weight entries yet.
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import { useWeightStore } from "~/stores/weight";

const weightStore = useWeightStore();

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

const hasData = computed(() => weightStore.weights.length > 0);

onMounted(async () => {
  if (!weightStore.weights.length) {
    await weightStore.fetchWeights();
  }
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>

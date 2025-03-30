<template>
  <div>
    <h1 class="text-4xl text-pink-600 font-light">Dashboard</h1>
    <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <WeightHistoryChart />
    </div>
  </div>
</template>

<script lang="ts" setup>
import WeightHistoryChart from "~/components/charts/WeightHistoryChart.vue";

definePageMeta({
  middleware: ["authenticated", "onboarding-required"],
});
</script>

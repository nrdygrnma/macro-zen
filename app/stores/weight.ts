import type { WeightEntry } from "~/types/weight";

export const useWeightStore = defineStore("weight", () => {
  const weights = ref<WeightEntry[]>([]);
  const loading = ref(false);

  const fetchWeights = async () => {
    const { data } = await useFetch<WeightEntry[]>("/api/weight-history");
    weights.value = data.value || [];
  };

  const addWeight = async (weight: number, date?: string | Date) => {
    try {
      const { data: newEntry } = await useFetch<WeightEntry>("/api/weight", {
        method: "POST",
        body: {
          weight,
          date: date ? new Date(date).toISOString() : undefined,
        },
      });
      if (newEntry.value) {
        weights.value.unshift(newEntry.value);
      }
    } catch (error) {
      console.error("Failed to add weight:", error);
    }
  };

  return {
    weights,
    loading,
    fetchWeights,
    addWeight,
  };
});

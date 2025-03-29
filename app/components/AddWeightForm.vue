<template>
  <form class="flex flex-wrap items-end gap-4" @submit.prevent="submit">
    <UFormField class="w-32" label="Weight (kg)">
      <UInput v-model.number="weight" required step="0.1" type="number" />
    </UFormField>

    <UFormField class="w-40" label="Date">
      <UInput v-model="date" type="date" />
    </UFormField>

    <UButton :loading="loading" type="submit">Add</UButton>
  </form>
</template>

<script lang="ts" setup>
const weightStore = useWeightStore();
const toast = useToast();

const weight = ref<number | null>(null);
const date = ref("");
const loading = ref(false);

const emit = defineEmits(["entry-added"]);

const submit = async () => {
  if (!weight.value) return;

  loading.value = true;

  try {
    await weightStore.addWeight(weight.value, date.value);
    toast.add({
      title: "Success",
      description: "Weight added",
      color: "success",
    });
    emit("entry-added");

    weight.value = null;
    date.value = "";
  } catch (e) {
    toast.add({
      title: "Error",
      description: "Failed to add weight",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>

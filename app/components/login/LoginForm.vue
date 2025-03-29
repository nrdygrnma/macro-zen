<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <UFormField class="w-full" label="Email">
      <UInput
        ref="emailInput"
        v-model="credentials.email"
        autocomplete="email"
        class="w-full"
        icon="mdi:email-outline"
        placeholder="you@example.com"
        required
        type="email"
      />
    </UFormField>

    <UFormField label="Password">
      <UInput
        v-model="credentials.password"
        autocomplete="current-password"
        class="w-full"
        icon="mdi:form-textbox-password"
        placeholder="••••••••"
        required
        type="password"
      />
    </UFormField>

    <div class="flex justify-center">
      <UButton
        :loading="loading"
        class="w-1/3 justify-center"
        label="Sign in"
        type="submit"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
defineProps<{ loading?: boolean }>();

const emit = defineEmits<{
  (e: "login", credentials: { email: string; password: string }): void;
}>();

const emailInput = ref();
const credentials = reactive({
  email: "",
  password: "",
});

const handleSubmit = () => {
  emit("login", { ...credentials });
};

onMounted(() => {
  emailInput.value?.inputRef?.focus();
});
</script>

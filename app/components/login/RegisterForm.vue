<template>
  <form class="space-y-4" @submit.prevent="register">
    <UFormField class="w-full" label="Name">
      <UInput
        v-model="form.name"
        class="w-full"
        icon="mdi:account"
        placeholder="Your full name"
        required
      />
    </UFormField>

    <UFormField label="Email">
      <UInput
        v-model="form.email"
        class="w-full"
        icon="mdi:email-outline"
        placeholder="you@example.com"
        required
        type="email"
      />
    </UFormField>

    <UFormField label="Password">
      <UInput
        v-model="form.password"
        class="w-full"
        icon="mdi:form-textbox-password"
        placeholder="••••••••"
        required
        type="password"
      />
    </UFormField>

    <div class="flex justify-center">
      <UButton
        class="w-1/3 justify-center"
        icon="mdi:account-plus-outline"
        label="Register"
        type="submit"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
const form = reactive({
  name: "",
  email: "",
  password: "",
});

const toast = useToast();
const { fetch: refreshSession } = useUserSession();

const register = async () => {
  try {
    await $fetch("/api/register", {
      method: "POST",
      body: form,
    });

    toast.add({
      title: "Registration successful",
      description: "Welcome to MacroZen 🎉",
      color: "success",
    });

    await refreshSession();
    await navigateTo("/");
  } catch (error: any) {
    toast.add({
      title: "Registration failed",
      description: error?.data?.message || "Something went wrong.",
      color: "error",
    });
  }
};
</script>

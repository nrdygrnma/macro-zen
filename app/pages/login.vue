<template>
  <div>
    <h1 class="leading-12 mb-10">Login</h1>
    <LoginForm :loading="isLoading" @login="login" />

    <p class="mt-6 text-center text-sm text-gray-500">
      Don't have an account?
      <NuxtLink
        class="font-medium text-primary-500 hover:underline"
        to="/register"
      >
        Register here
      </NuxtLink>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useLogin } from "~/composables/login/useLogin";

definePageMeta({
  layout: "auth-layout",
});

const { login, isLoading } = useLogin();
</script>

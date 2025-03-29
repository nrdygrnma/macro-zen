<template>
  <div>
    <h1 class="leading-12 mb-6">Welcome to MacroZen</h1>
    <LoginForm :loading="isLoading" @login="login" />
  </div>
</template>

<script lang="ts" setup>
import { useLogin } from "~/composables/login/useLogin";

definePageMeta({
  layout: "auth-layout",
});

const { login, isLoading } = useLogin();
</script>

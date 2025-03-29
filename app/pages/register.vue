<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold leading-12 mb-10">Register</h1>
      <RegisterForm />

      <p class="mt-6 text-center text-sm text-gray-500">
        Already have an account?
        <NuxtLink
          class="font-medium text-primary-500 hover:underline"
          to="/login"
        >
          Sign in here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RegisterForm from "~/components/login/RegisterForm.vue";

definePageMeta({
  layout: false,
});
</script>

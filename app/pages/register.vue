<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-bold text-center leading-12">
        Create your MacroZen account
      </h1>
      <RegisterForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RegisterForm from "~/components/login/RegisterForm.vue";

definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <h1 class="text-4xl text-pink-600 font-light">Settings</h1>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["authenticated", "onboarding-required"],
});
</script>

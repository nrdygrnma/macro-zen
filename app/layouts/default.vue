<template>
  <UContainer>
    <NavBar class="mb-10" />
    <slot />
  </UContainer>
</template>

<script lang="ts" setup>
import NavBar from "~/components/NavBar.vue";
</script>

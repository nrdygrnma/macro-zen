<template>
  <UContainer>
    <NavBar v-if="loggedIn" class="mb-10" />
    <slot />
  </UContainer>
</template>

<script lang="ts" setup>
import NavBar from "~/components/NavBar.vue";
import { useUserSession } from "#imports";

const { loggedIn } = useUserSession();
</script>

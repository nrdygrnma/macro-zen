<template>
  <div class="flex items-center justify-between w-full">
    <NuxtLink class="text-md font-bold text-slate-700" to="/"
      >macroZEN</NuxtLink
    >

    <div class="flex items-center gap-4">
      <UNavigationMenu
        :items="items"
        color="primary"
        highlight
        variant="pill"
      />

      <UserMenu v-if="loggedIn" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserSession } from "#imports";

const { loggedIn } = useUserSession();

const items = ref([
  [
    { label: "Dashboard", icon: "lucide:gauge", to: "/" },
    { label: "Log Food", icon: "lucide:utensils", to: "/food" },
    { label: "Weight", icon: "lucide:weight", to: "/weight" },
    { label: "Fasting", icon: "lucide:timer", to: "/fasting" },
  ],
]);
</script>

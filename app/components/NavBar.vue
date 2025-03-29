<template>
  <div class="flex items-center justify-between w-full">
    <a class="text-md font-bold text-slate-700" href="/"> macroZEN </a>

    <div class="flex">
      <UNavigationMenu
        :items="items"
        color="primary"
        highlight
        variant="pill"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = ref([
  [
    { label: "Dashboard", icon: "lucide:gauge", to: "/" },
    { label: "Log Food", icon: "lucide:utensils", to: "/food" },
    { label: "Weight", icon: "lucide:weight", to: "/weight" },
    { label: "Fasting", icon: "lucide:timer", to: "/fasting" },
    { label: "Settings", icon: "lucide:settings", to: "/settings" },
  ],
]);
</script>

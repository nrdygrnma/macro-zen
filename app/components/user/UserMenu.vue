<template>
  <UDropdownMenu :items="menuItems" :ui="{ content: 'w-48' }">
    <UAvatar
      :alt="typedUser.name"
      :src="typedUser.avatar || undefined"
      class="cursor-pointer"
      size="md"
    />
  </UDropdownMenu>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";
import type { AuthUser } from "~/types/auth";

const router = useRouter();
const { user, clear: logout } = useUserSession();

const typedUser = computed(() => user.value as AuthUser);

const menuItems = ref<DropdownMenuItem[]>([
  {
    label: "Settings",
    icon: "lucide:settings",
    value: "settings",
    async onSelect() {
      await router.push("/settings");
    },
  },
  {
    label: "Logout",
    icon: "lucide:log-out",
    value: "logout",
    async onSelect() {
      await logout();
      await router.push("/login");
    },
  },
]);
</script>

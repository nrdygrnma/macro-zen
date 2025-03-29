import type { AuthUser } from "~/types/auth";

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession();
  const route = useRoute();

  const isClient = import.meta.client;
  const isLoggedIn = loggedIn.value;
  const typedUser = user.value as AuthUser;

  if (!isClient || !isLoggedIn) return;

  const onboardingDone = typedUser?.onboardingDone === true;
  const isOnboardingRoute = route.path === "/onboarding";

  if (!onboardingDone && !isOnboardingRoute) {
    return navigateTo("/onboarding");
  }

  if (onboardingDone && isOnboardingRoute) {
    return navigateTo("/");
  }
});

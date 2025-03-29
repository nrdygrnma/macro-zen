import type { AuthUser } from "~/types/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession();

  if (!import.meta.client || !loggedIn.value) return;

  const typedUser = user.value as AuthUser | null;

  const onboardingDone = typedUser?.onboardingDone === true;
  const isOnboardingRoute = to.path === "/onboarding";

  // Redirect user to onboarding if it's not completed yet
  if (!onboardingDone && !isOnboardingRoute) {
    return navigateTo("/onboarding");
  }

  // Prevent accessing onboarding again after it's completed
  if (onboardingDone && isOnboardingRoute) {
    return navigateTo("/");
  }
});

export function useLogin() {
  const { fetch: refreshSession } = useUserSession();
  const toast = useToast();

  const isLoading = ref(false);

  const login = async (credentials: { email: string; password: string }) => {
    isLoading.value = true;

    try {
      await $fetch("/api/login", {
        method: "POST",
        body: credentials,
      });

      toast.add({
        title: "Login successful",
        description: "Welcome back 👋",
        color: "success",
      });

      await refreshSession();
      await navigateTo("/");
    } catch (error) {
      toast.add({
        title: "Login failed",
        description: "Incorrect email or password.",
        color: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  return { login, isLoading };
}

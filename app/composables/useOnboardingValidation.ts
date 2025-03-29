export function useOnboardingValidation(user: ReturnType<typeof useUserStore>) {
  return (step: number) => {
    if (step === 0) return true;
    if (step === 1) return user.weight && user.goalWeight;
    if (step === 2) return user.age && user.height && !!user.sex;
    if (step === 3) return !!user.activity;
    if (step === 4) return !!user.goal;
    if (step === 5) return !user.fasting || !!user.fastingMethod;
    return true;
  };
}

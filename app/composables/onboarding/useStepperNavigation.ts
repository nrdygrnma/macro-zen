export function useStepperNavigation(
  step: Ref<number>,
  isStepValid: (s: number) => boolean,
) {
  return (val: string | number | undefined) => {
    if (typeof val !== "number") return;
    const isMovingForward = val > step.value;

    if (!isMovingForward || (isMovingForward && isStepValid(step.value))) {
      step.value = val;
    }
  };
}

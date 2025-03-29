import { nextTick, type Ref, watch } from "vue";

/**
 * Automatically focuses a specific input or interactive element when a step changes.
 *
 * @param step - A ref representing the current onboarding step.
 * @param stepToRefMap - A map of step numbers to component refs containing focusable elements.
 */
export function useAutoStepFocus(
  step: Ref<number>,
  stepToRefMap: Record<number, Ref<any>>,
) {
  watch(step, async (val) => {
    await nextTick();

    setTimeout(() => {
      const ref = stepToRefMap[val]?.value;

      if (!ref) return;

      if (ref.inputRef?.focus) {
        ref.inputRef.focus();
        return;
      }

      if (typeof ref.focus === "function") {
        ref.focus();
        return;
      }

      const focusable = ref?.$el?.querySelector?.(
        "[tabindex], input, button, [data-focusable]",
      );
      if (focusable && typeof focusable.focus === "function") {
        focusable.focus();
      }
    }, 0);
  });
}

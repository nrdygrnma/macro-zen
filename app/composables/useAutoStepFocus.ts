import { nextTick, type Ref, watch } from "vue";

export function useAutoStepFocus(
  step: Ref<number>,
  stepToRefMap: Record<number, Ref<any>>,
) {
  watch(step, async (val) => {
    await nextTick();

    const ref = stepToRefMap[val]?.value;

    if (!ref) return;

    // Case 1: UInput or similar (with .inputRef)
    if (ref.inputRef) {
      ref.inputRef.focus();
      return;
    }

    // Case 2: Plain DOM element or custom wrapper with focus
    if (typeof ref.focus === "function") {
      ref.focus();
      return;
    }

    // Case 3: Component with a focusable child (e.g., URadioGroup)
    const focusable = ref.$el?.querySelector?.(
      "[tabindex], input, button, [data-focusable]",
    );
    if (focusable && typeof focusable.focus === "function") {
      focusable.focus();
    }
  });
}

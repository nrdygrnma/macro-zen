import { nextTick, type Ref, watch } from "vue";

export function useAutoStepFocus(
  step: Ref<number>,
  stepToRefMap: Record<number, Ref<any>>,
) {
  watch(step, async (val) => {
    await nextTick();

    const ref = stepToRefMap[val]?.value;

    if (!ref) return;

    if (ref.inputRef) {
      ref.inputRef.focus();
      return;
    }

    if (typeof ref.focus === "function") {
      ref.focus();
      return;
    }

    const focusable = ref.$el?.querySelector?.(
      "[tabindex], input, button, [data-focusable]",
    );
    if (focusable && typeof focusable.focus === "function") {
      focusable.focus();
    }
  });
}

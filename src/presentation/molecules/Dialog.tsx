"use client";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

type DialogProps = Omit<ComponentPropsWithoutRef<"dialog">, "open" | "onCancel" | "onClose"> & {
  suspended?: boolean;
  onDismiss: () => void;
};
/** Native focus trapping and Escape dismissal; playback can temporarily suspend it. */
export default function Dialog({ suspended = false, onDismiss, children, ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (suspended) dialog?.close();
    else if (!dialog?.open) dialog?.showModal();
    return () => dialog?.close();
  }, [suspended]);
  return <dialog {...props} ref={ref} onCancel={(event) => { event.preventDefault(); onDismiss(); }}>{children}</dialog>;
}

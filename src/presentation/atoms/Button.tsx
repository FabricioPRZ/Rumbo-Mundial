import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
  loading?: boolean;
  disabledReason?: string;
}
/** A native button with consistent variants, busy state and disabled explanations. */
export default function Button({ variant, loading = false, disabledReason, disabled, className = "", type = "button", children, ...props }: ButtonProps) {
  return <button {...props} type={type} className={[variant, className].filter(Boolean).join(" ")} disabled={disabled || loading || !!disabledReason} aria-busy={loading || undefined} title={disabledReason || props.title}>{children}</button>;
}

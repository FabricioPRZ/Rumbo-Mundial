import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { invalid?: boolean }
export default function Input({ invalid, ...props }: InputProps) {
  return <input {...props} aria-invalid={invalid || props["aria-invalid"]} />;
}

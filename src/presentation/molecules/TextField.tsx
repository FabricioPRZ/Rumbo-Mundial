"use client";
import { useId } from "react";
import Input, { type InputProps } from "../atoms/Input";
export default function TextField({ label, error, id, ...props }: InputProps & { label: string; error?: string }) {
  const generated = useId();
  const fieldId = id ?? generated;
  return <label htmlFor={fieldId}>{label}<Input {...props} id={fieldId} invalid={!!error} aria-describedby={error ? `${fieldId}-error` : props["aria-describedby"]} />{error && <small id={`${fieldId}-error`} role="alert">{error}</small>}</label>;
}

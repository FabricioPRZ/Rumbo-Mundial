"use client";
import { useId } from "react";
import Input from "../atoms/Input";
export default function VolumeControl({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const id = useId();
  return <><label htmlFor={id}>{label} <output>{value}%</output></label><Input id={id} type="range" min={0} max={100} step={1} value={value} onChange={(event) => onChange(Number(event.target.value))} /></>;
}

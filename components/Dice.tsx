"use client";
export default function Dice({
  values,
  rollId = 0,
}: {
  values: [number, number];
  rollId?: number;
}) {
  return (
    <div
      key={rollId}
      className={`dice ${rollId ? "rolling" : ""}`}
      aria-label={`Dados: ${values[0]} y ${values[1]}. Total ${values[0] + values[1]}.`}
    >
      {values.map((n, i) => (
        <span key={i}>{["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][n - 1]}</span>
      ))}
    </div>
  );
}

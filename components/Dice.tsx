import { useEffect, useState } from "react";
export default function Dice({ values }: { values: [number, number] }) {
  const [rolling, setRolling] = useState(false);
  useEffect(() => {
    setRolling(true);
    const t = setTimeout(() => setRolling(false), 450);
    return () => clearTimeout(t);
  }, [values]);
  return (
    <div
      className={`dice ${rolling ? "rolling" : ""}`}
      aria-label={`Dados: ${values[0]} y ${values[1]}`}
    >
      {values.map((n, i) => (
        <span key={i}>{["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][n - 1]}</span>
      ))}
    </div>
  );
}

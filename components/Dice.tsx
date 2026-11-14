const positions: Record<number, number[]> = {1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
export default function Dice({ values, rollId = 0 }: { values: [number, number]; rollId?: number }) {
  return <div className={`dice ${rollId ? "rolling" : ""}`} key={rollId} aria-label={`Dados: ${values.filter(Boolean).join(" y ")}`}>
    {values.filter(Boolean).map((value,i) => <span className="die-face" key={i} aria-hidden="true">{Array.from({length:9},(_,dot) => <i key={dot} className={positions[value]?.includes(dot) ? "pip visible" : "pip"}/>)}</span>)}
  </div>;
}

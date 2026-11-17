export function Globe({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 360 240" fill="none" aria-hidden="true">
    <ellipse cx="180" cy="218" rx="94" ry="12" fill="currentColor" opacity=".08" />
    <circle cx="180" cy="112" r="94" fill="#d7efeb" stroke="#217b7b" strokeWidth="2" />
    <ellipse cx="180" cy="112" rx="48" ry="94" stroke="#8bc3b7" />
    <ellipse cx="180" cy="112" rx="82" ry="94" stroke="#8bc3b7" />
    <path d="M86 112h188M100 64h160M100 160h160M180 18v188" stroke="#8bc3b7" />
    <path d="m115 46 22-10 15 8 9 23-8 12-13 2 3 17-10 13-18-7-3-14-13-9 4-18zm28 69 24 5 14 17-8 27-17 25-8-8-1-23-11-18zm51-71 18-9 25 13-3 12 20 13 8 21-14 10-23-6-9 12-10-8 4-19-18-10zm1 61 21 4 14 24-10 27-12 5-14-23-8-23zm43 54 22 4 8 15-18 8-19-8z" fill="#60a695" />
    <path d="M54 151C16 185 53 210 151 183s180-95 153-119c-10-8-26-8-42-4" stroke="#e5914c" strokeWidth="3" strokeDasharray="6 6" />
    <g transform="translate(290 65) rotate(-35)"><path d="m0-18 5 13 18 10v5L5 6l-1 13 7 6v4L0 25l-11 4v-4l7-6-1-13-18 4V5L-5-5z" fill="#203f59" stroke="#fff" strokeWidth="2" /></g>
    <circle cx="130" cy="101" r="5" fill="#e77753" stroke="white" strokeWidth="2" />
    <circle cx="227" cy="69" r="5" fill="#e77753" stroke="white" strokeWidth="2" />
  </svg>;
}

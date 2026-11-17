export function Building({ hotel = false }: { hotel?: boolean }) {
  return <svg className={`building-piece ${hotel ? "hotel" : "house"}`} viewBox="0 0 32 32" aria-label={hotel ? "Hotel" : "Casa"} role="img">
    {hotel ? <><path d="M7 6h19v23H7z" fill="#c66646"/><path d="M3 10 7 6v23l-4-3z" fill="#91442e"/><path d="M5 4h23v4H5z" fill="#edab70"/><path d="M11 11h4v4h-4zm7 0h4v4h-4zm-7 7h4v4h-4zm7 0h4v4h-4z" fill="#ffedbc"/><path d="M14 24h5v5h-5z" fill="#723c37"/></> : <><path d="M5 15 17 5l12 10v14H5z" fill="#5db6a2"/><path d="M2 15 16 3l15 12-3 3L16 8 5 18z" fill="#216c68"/><path d="M10 20h6v9h-6zm10-3h5v6h-5z" fill="#fff0b8"/></>}
  </svg>;
}

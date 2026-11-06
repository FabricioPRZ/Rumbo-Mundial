```text
turista-mundial/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── next-env.d.ts
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── app
│   ├── api
│   │   └── rooms
│   │       ├── [id]
│   │       │   ├── action
│   │       │   │   └── route.ts
│   │       │   ├── join
│   │       │   │   └── route.ts
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── sala
│       └── [id]
│           └── page.tsx
├── components
│   ├── Board.tsx
│   ├── Dice.tsx
│   ├── EntryForm.tsx
│   ├── Log.tsx
│   ├── PlayerPanel.tsx
│   ├── PropertyCard.tsx
│   ├── Room.tsx
│   └── TradeModal.tsx
├── lib
│   ├── game
│   │   ├── board.ts
│   │   ├── cards.ts
│   │   ├── engine.ts
│   │   ├── rules.ts
│   │   └── types.ts
│   ├── http.ts
│   └── store.ts
├── tests
│   ├── api-smoke.mjs
│   ├── engine.test.ts
│   └── store.test.ts
├── scripts
│   └── entrega.mjs
└── README.md
```

## .env.example

````text
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
# Alternativamente: KV_REST_API_URL y KV_REST_API_TOKEN
````

## .gitignore

````text
node_modules
.next
.env*
!.env.example
*.tsbuildinfo
coverage
.vercel
````

## package.json

````json
{
  "name": "turista-mundial",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:api": "node tests/api-smoke.mjs",
    "entrega": "node scripts/entrega.mjs"
  },
  "dependencies": {
    "@upstash/redis": "^1.35.3",
    "next": "^15.5.29",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "zod": "^3.25.0"
  },
  "devDependencies": {
    "@types/node": "^22.15.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "typescript": "^5.8.3",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.5.3",
    "autoprefixer": "^10.4.21",
    "vitest": "^3.2.0",
    "eslint": "^9.25.0",
    "eslint-config-next": "^15.5.29",
    "@eslint/eslintrc": "^3.3.1"
  },
  "engines": {
    "node": ">=22.0.0"
  }
}
````

## tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
````

## next-env.d.ts

````typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
````

## next.config.ts

````typescript
import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  experimental: { cpus: 2 },
};
export default config;
````

## tailwind.config.ts

````typescript
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
````

## postcss.config.mjs

````javascript
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
````

## eslint.config.mjs

````javascript
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];
````

## app/api/rooms/[id]/action/route.ts

````typescript
import { body, respond } from "@/lib/http";
import { act } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return respond(async () => act((await params).id, await body(req)));
}
````

## app/api/rooms/[id]/join/route.ts

````typescript
import { body, respond } from "@/lib/http";
import { joinRoom } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return respond(async () => joinRoom((await params).id, await body(req)));
}
````

## app/api/rooms/[id]/route.ts

````typescript
import { NextResponse } from "next/server";
import { respond } from "@/lib/http";
import { getRoom } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = new URL(req.url);
  const response = await respond(() =>
    getRoom(
      id,
      req.headers.get("authorization")?.replace(/^Bearer /, "") ?? null,
      req.headers.get("x-heartbeat") === "1",
    ),
  );
  if (response.ok) {
    const data = await response.clone().json();
    if (url.searchParams.get("since") === String(data.game.version))
      return NextResponse.json(
        {
          changed: false,
          inactiveFor: data.inactiveFor,
          playerId: data.playerId,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
  }
  return response;
}
````

## app/api/rooms/route.ts

````typescript
import { body, respond } from "@/lib/http";
import { createRoom } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: Request) {
  return respond(async () => createRoom(await body(req)));
}
````

## app/globals.css

````css
@tailwind base;
@tailwind components;
@tailwind utilities;
:root {
  --paper: #f6f3e9;
  --ink: #153f35;
  --line: #d8ddcc;
  --accent: #de553b;
  --muted: #58685b;
  color-scheme: light;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Trebuchet MS", Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.45;
  font-kerning: normal;
  text-rendering: optimizeLegibility;
}
button,
input,
select {
  font: inherit;
}
button,
a,
input,
select {
  -webkit-tap-highlight-color: transparent;
}
button {
  cursor: pointer;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fffdf6;
  padding: 10px 14px;
  min-height: 44px;
  color: var(--ink);
  touch-action: manipulation;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid #e6ab2c;
  outline-offset: 3px;
}
a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 4px;
}
h1,
h2,
h3,
p {
  margin: 0;
}
h1,
h2,
h3 {
  font-weight: 700;
  text-wrap: balance;
}
h1 {
  font-family: Georgia, serif;
  letter-spacing: -0.045em;
  line-height: 1.02;
}
h2 {
  font-size: 1.35rem;
  line-height: 1.2;
}
h3 {
  font-size: 1rem;
  margin: 18px 0 10px;
}
p {
  margin: 12px 0;
  max-width: 65ch;
}
small {
  font-size: 0.8rem;
  color: var(--muted);
  display: block;
  line-height: 1.4;
}
.eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  margin: 0 0 14px;
}
.brand {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-decoration: none;
  display: flex;
  gap: 24px;
  align-items: center;
}
.brand span {
  font-size: 0.65rem;
  color: var(--muted);
  margin-left: auto;
}
.home,
.room {
  max-width: 1480px;
  margin: auto;
  padding: 28px 40px;
}
.home-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 80px;
  padding: 95px 0 70px;
  align-items: center;
}
.hero h1 {
  font-size: clamp(4rem, 7.5vw, 7.5rem);
}
.hero h1 span {
  color: var(--accent);
}
.hero > p:not(.eyebrow) {
  font-size: 1.15rem;
  max-width: 39ch;
  margin-top: 25px;
}
.panel {
  background: #fffdf7;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
}
.entry {
  padding: 32px;
  box-shadow: 8px 8px 0 #e3e6d7;
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 480px;
  width: 100%;
}
.tabs {
  display: flex;
  background: #edeedf;
  padding: 4px;
  border-radius: 10px;
}
.tabs button {
  flex: 1;
  border: 0;
  background: transparent;
}
.tabs button[aria-pressed="true"] {
  background: var(--ink);
  color: white;
}
label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 0.9rem;
  font-weight: 600;
}
input,
select {
  border: 1px solid #bdc8b9;
  border-radius: 8px;
  background: #fffef9;
  padding: 12px;
  min-height: 46px;
  min-width: 0;
  width: 100%;
  color: var(--ink);
  font-size: 16px;
}
fieldset {
  border: 0;
  padding: 0;
  margin: 0;
}
legend {
  font-size: 0.9rem;
  margin-bottom: 12px;
}
.colors {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.colors button {
  width: 44px;
  height: 44px;
  color: white;
  border-radius: 50%;
  padding: 0;
  border: 3px solid transparent;
  font-size: 1.5rem;
}
.colors button[aria-pressed="true"] {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}
.primary {
  background: var(--ink);
  border-color: var(--ink);
  color: white;
  font-weight: 700;
}
.route-art {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 35px 0;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}
.route-art i {
  flex: 1;
  border-bottom: 2px dashed #b8c6af;
  text-align: center;
  font-size: 2rem;
  transform: rotate(-5deg);
  color: var(--accent);
}
.facts {
  display: flex;
  gap: 35px;
}
.facts b {
  font-family: Georgia, serif;
  font-size: 2.3rem;
}
.facts small {
  font-size: 0.7rem;
}
footer {
  border-top: 1px solid var(--line);
  padding: 22px 0;
  margin-top: 30px;
  color: var(--muted);
  font-size: 0.75rem;
}
.error {
  background: #ffede6;
  border: 1px solid #e5b3a2;
  border-radius: 8px;
  padding: 12px;
  color: #923720;
}
.notice {
  background: #e0ebd6;
  padding: 12px;
  border-radius: 8px;
}
.empty {
  max-width: 650px;
  margin: 12vh auto;
}
.empty h1 {
  font-size: 2.8rem;
}
.room-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 24px;
}
.room-code {
  display: flex;
  gap: 10px;
  align-items: center;
}
.room-code b {
  letter-spacing: 0.12em;
  font-size: 1.2rem;
}
.room-code button {
  font-size: 0.8rem;
}
.lobby-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 30px;
  margin: 45px auto;
  max-width: 1100px;
  align-items: start;
}
.lobby h1 {
  font-size: 3.5rem;
  margin-bottom: 24px;
}
.lobby fieldset {
  margin: 24px 0;
}
.passengers {
  list-style: none;
  padding: 0;
  margin: 25px 0;
}
.passengers li {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}
.passengers span {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: white;
  display: grid;
  place-items: center;
}
.passengers small {
  margin-left: auto;
}
.guide p {
  margin: 24px 0;
}
.status-strip {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin: 4px 0 18px;
  font-size: 0.85rem;
}
.status-strip i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}
.game-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;
}
.game-layout aside {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.board-scroll {
  overflow: auto;
  border-radius: 12px;
  border: 2px solid var(--ink);
  background: #e9eddb;
}
.board {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
  aspect-ratio: 1;
  position: relative;
  min-width: 620px;
  isolation: isolate;
}
.square {
  padding: 7px 2px 3px;
  min-height: 0;
  min-width: 0;
  border: 1px solid #a9b9a2;
  border-radius: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  background: #faf8ed;
  overflow: hidden;
}
.square strong {
  font-size: clamp(8px, 0.8vw, 12px);
  font-weight: 700;
  line-height: 1.1;
  overflow-wrap: anywhere;
}
.square small {
  font-size: clamp(7px, 0.65vw, 10px);
}
.square .stripe {
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.square-icon {
  font-size: 16px;
  line-height: 1;
}
.square.country .square-icon {
  display: none;
}
.buildings {
  font-size: 9px;
  line-height: 1;
}
.mortgage-badge {
  position: absolute;
  bottom: 1px;
  right: 2px;
  font-size: 9px;
  color: #a43d2d;
  font-weight: bold;
}
.board-center {
  grid-area: 2 / 2 / 11 / 11;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  background: radial-gradient(ellipse at center, #f2f2df 0%, #e3e9d3 100%);
  border: 8px solid #e9eddb;
}
.board-center h2 {
  font-family: Georgia, serif;
  font-size: clamp(3rem, 5vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
  text-align: center;
}
.board-center p:not(.eyebrow) {
  font-size: 0.9rem;
  text-align: center;
  max-width: 32ch;
}
.board-center > small {
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  margin-top: 24px;
}
.deck-cards {
  display: flex;
  gap: 28px;
  margin: 28px 0;
}
.deck-cards div {
  background: #fffdf0;
  width: 90px;
  height: 110px;
  border: 1px solid #b8c2ac;
  box-shadow: 3px 3px 0 #c5cfb8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transform: rotate(-9deg);
}
.deck-cards div:nth-child(2) {
  transform: rotate(9deg);
  background: #f1c8a5;
}
.deck-cards b {
  font-size: 0.75rem;
}
.token {
  position: absolute;
  width: 2.35%;
  height: 2.35%;
  border-radius: 50%;
  color: white;
  display: grid;
  place-items: center;
  font-size: clamp(9px, 1.05vw, 14px);
  border: 1px solid white;
  box-shadow: 0 1px 3px #0005;
  pointer-events: none;
  transition:
    left 95ms linear,
    top 95ms linear;
  z-index: 3;
}
.players-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 16px 0;
}
.players-strip > div {
  flex: 1;
  min-width: 105px;
  border-top: 4px solid;
  padding: 10px;
  background: #fffdf7;
  border-radius: 5px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.balance {
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.dice {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 4rem;
  line-height: 1;
  margin: 14px 0;
}
.rolling span {
  animation: shake 0.4s ease-out;
}
@keyframes shake {
  0% {
    transform: rotate(-15deg);
  }
  30% {
    transform: rotate(18deg) translateY(-5px);
  }
  70% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0);
  }
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.actions button {
  width: 100%;
}
.actions small {
  margin: 5px 0;
}
.owned {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.owned button {
  font-size: 0.8rem;
  text-align: left;
  border-left-width: 6px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
}
.property {
  border-top: 6px solid;
}
.property dl {
  display: flex;
  gap: 16px;
  margin: 18px 0;
}
.property dt {
  font-size: 0.7rem;
  color: var(--muted);
}
.property dd {
  font-weight: 700;
  margin: 0;
}
.rent-list {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  margin-bottom: 14px;
}
.rent-list span {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  padding: 6px 0;
}
.asset-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}
.asset-actions button {
  width: 100%;
  font-size: 0.85rem;
}
.asset-actions small {
  font-size: 0.7rem;
  margin: 4px 0;
}
.log {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  max-height: 260px;
  overflow: auto;
  font-size: 0.85rem;
}
.log li {
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
}
.log li:first-child {
  font-weight: 700;
}
.trade-modal {
  width: min(640px, 95vw);
  max-height: 90dvh;
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
  color: var(--ink);
  padding: 25px;
}
.trade-modal::backdrop {
  background: #173f35aa;
}
.trade-modal .row {
  margin-bottom: 20px;
}
.trade-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 24px 0;
}
.checkbox {
  flex-direction: row;
  align-items: center;
  font-size: 0.8rem;
  margin-top: 10px;
}
.checkbox input {
  width: 20px;
  min-height: 20px;
}
.trade-modal p {
  font-size: 0.85rem;
}
.victory {
  background: var(--ink);
  color: var(--paper);
  margin: 25px 0;
  text-align: center;
}
.victory h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
}
.victory p {
  margin: 12px auto;
}
.victory a {
  display: inline-block;
  margin: 20px;
}
.victory .eyebrow {
  color: #e1ca83;
}
@media (hover: hover) {
  button:not(:disabled):hover {
    filter: brightness(0.94);
  }
}
@media (max-width: 1050px) {
  .home,
  .room {
    padding: 24px;
  }
  .home-grid {
    gap: 35px;
    padding-top: 55px;
  }
  .game-layout {
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 16px;
  }
  .panel {
    padding: 18px;
  }
  .square strong {
    font-size: 9px;
  }
  .square small {
    font-size: 8px;
  }
}
@media (max-width: 780px) {
  .home,
  .room {
    padding: 18px 14px;
  }
  .brand span {
    display: none;
  }
  .home-grid,
  .lobby-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 0 20px;
  }
  .hero h1 {
    font-size: 4.4rem;
  }
  .hero > p:not(.eyebrow) {
    font-size: 1rem;
  }
  .entry {
    max-width: none;
    padding: 24px;
  }
  .facts {
    gap: 30px;
  }
  .game-layout {
    display: flex;
    flex-direction: column;
  }
  .game-layout > section,
  .game-layout aside {
    width: 100%;
  }
  .game-layout aside {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .board {
    min-width: 660px;
  }
  .room-header {
    gap: 18px;
  }
  .room-code {
    flex-wrap: wrap;
  }
  .room-header > .brand {
    width: 100%;
  }
  .lobby-grid {
    margin: 0;
  }
  .lobby h1 {
    font-size: 2.8rem;
  }
  .token {
    font-size: 11px;
  }
  .board-center h2 {
    font-size: 4rem;
  }
  .status-strip {
    font-size: 0.75rem;
    gap: 8px;
  }
  .board-scroll {
    max-height: 85dvh;
  }
  .trade-columns {
    gap: 12px;
  }
}
@media (max-width: 520px) {
  .game-layout aside {
    display: flex;
  }
  .hero h1 {
    font-size: 3.9rem;
  }
  .room-code button {
    padding: 8px;
  }
  .board-scroll {
    position: relative;
  }
  .board-scroll::after {
    content: "Desliza para explorar el tablero ↔";
    display: block;
    position: sticky;
    left: 0;
    text-align: center;
    font-size: 12px;
    background: #e3e9d3;
    padding: 7px;
    width: 100%;
  }
  .trade-columns {
    grid-template-columns: 1fr;
  }
  .passengers small {
    font-size: 0.65rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
.board-zoom {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-size: 0.75rem;
  margin-bottom: 10px;
}
.board-zoom input {
  width: 120px;
  min-height: 32px;
  padding: 0;
  accent-color: var(--ink);
}
.board-zoom span {
  font-variant-numeric: tabular-nums;
}
````

## app/layout.tsx

````tsx
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Turista Mundial · El mundo en tu mesa",
  description:
    "Viaja, compra y negocia con tus amigos. Juego de mesa multijugador en español.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
````

## app/page.tsx

````tsx
import EntryForm from "@/components/EntryForm";
export default function Home() {
  return (
    <main className="home">
      <header className="brand">
        ✈ TURISTA MUNDIAL <span>EDICIÓN ENTRE AMIGOS</span>
      </header>
      <div className="home-grid">
        <section className="hero">
          <p className="eyebrow">PASE DE ABORDAR / SIN SALIR DE CASA</p>
          <h1>
            El mundo
            <br />
            en tu mesa<span>.</span>
          </h1>
          <p>
            Compra países, abre restaurantes y negocia con tus amigos. La
            próxima escala la deciden los dados.
          </p>
          <div className="route-art" aria-hidden="true">
            <span>MEX</span>
            <i>✈</i>
            <span>EL MUNDO</span>
          </div>
          <div className="facts">
            <div>
              <b>40</b>
              <small>destinos y sorpresas</small>
            </div>
            <div>
              <b>2–6</b>
              <small>viajeros por sala</small>
            </div>
            <div>
              <b>∞</b>
              <small>ganas de revancha</small>
            </div>
          </div>
        </section>
        <EntryForm />
      </div>
      <footer>
        Adaptación independiente de reglas de juego de mesa. Datos del tablero
        no oficiales.
      </footer>
    </main>
  );
}
````

## app/sala/[id]/page.tsx

````tsx
import Room from "@/components/Room";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Room id={(await params).id.toUpperCase()} />;
}
````

## components/Board.tsx

````tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { BOARD } from "@/lib/game/board";
import type { Game } from "@/lib/game/types";
export function coordinates(id: number): [number, number] {
  if (id <= 10) return [10 - id, 10];
  if (id <= 20) return [0, 20 - id];
  if (id <= 30) return [id - 20, 0];
  return [10, id - 30];
}
export default function Board({
  game,
  onSelect,
}: {
  game: Game;
  onSelect: (id: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [animated, setAnimated] = useState<{
    player: string;
    position: number;
  } | null>(null);
  const previous = useRef(game.motion?.serial ?? 0);
  const latestMotion = useRef(game.motion);
  latestMotion.current = game.motion;
  const serial = game.motion?.serial;
  useEffect(() => {
    const motion = latestMotion.current;
    if (!motion || motion.serial === previous.current) return;
    previous.current = motion.serial;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    setAnimated({ player: motion.player, position: motion.path[0] });
    const timer = setInterval(() => {
      step++;
      if (step >= motion.path.length) {
        clearInterval(timer);
        setAnimated(null);
      } else
        setAnimated({ player: motion.player, position: motion.path[step] });
    }, 100);
    return () => clearInterval(timer);
  }, [serial]);
  const icons: Record<string, string> = {
    start: "⚑",
    oceania: "🏝",
    rest: "☀",
    "go-oceania": "➜",
    email: "✉",
    sms: "☏",
    tax: "$",
    airline: "✈",
    utility: "⚡",
  };
  return (
    <section className="board-section">
      <label className="board-zoom">
        Escala del tablero
        <input
          aria-label="Escala del tablero"
          type="range"
          min="0.5"
          max="1.25"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <span>{Math.round(zoom * 100)}%</span>
      </label>
      <div className="board-scroll">
        <div
          className="board"
          style={{ zoom }}
          aria-label="Tablero de 40 casillas"
        >
          {BOARD.map((b) => {
            const [x, y] = coordinates(b.id),
              a = game.properties[b.id],
              owner = game.players.find((p) => p.id === a?.owner);
            return (
              <button
                key={b.id}
                onClick={() => onSelect(b.id)}
                className={`square ${b.kind}`}
                style={{
                  gridColumn: x + 1,
                  gridRow: y + 1,
                  borderColor: owner?.color,
                }}
                aria-label={`${b.name}${a?.owner ? `, de ${owner?.name}` : ""}${a?.mortgaged ? ", hipotecada" : ""}`}
              >
                <span
                  className="stripe"
                  style={{ background: b.color ?? "transparent" }}
                />
                <span className="square-icon">{icons[b.kind]}</span>
                <strong>{b.name}</strong>
                <small>
                  {b.price ? `$${b.price}` : b.tax ? `$${b.tax}` : ""}
                </small>
                {a?.buildings ? (
                  <span className="buildings">
                    {a.buildings === 5 ? "🏨" : "🍴".repeat(a.buildings)}
                  </span>
                ) : null}
                {a?.mortgaged && <span className="mortgage-badge">H</span>}
              </button>
            );
          })}
          <div className="board-center">
            <p className="eyebrow">EL MUNDO ES TUYO</p>
            <h2>
              Turista
              <br />
              Mundial
            </h2>
            <div className="deck-cards">
              <div>
                ✉<b>E-Mail</b>
              </div>
              <div>
                ☏<b>SMS</b>
              </div>
            </div>
            <p>{game.lastCard ?? "Cada viaje comienza con una tirada."}</p>
            <small>MÉXICO · $200 POR VUELTA</small>
          </div>
          {game.players
            .filter((p) => !p.bankrupt)
            .map((p, i) => {
              const pos =
                animated?.player === p.id ? animated.position : p.position;
              const [x, y] = coordinates(pos);
              return (
                <span
                  key={p.id}
                  className="token"
                  title={p.name}
                  aria-label={`${p.name} en ${BOARD[pos].name}`}
                  style={{
                    left: `${((x + 0.18 + (i % 3) * 0.27) * 100) / 11}%`,
                    top: `${((y + 0.57 + Math.floor(i / 3) * 0.2) * 100) / 11}%`,
                    background: p.color,
                  }}
                >
                  ✈
                </span>
              );
            })}
        </div>
      </div>
    </section>
  );
}
````

## components/Dice.tsx

````tsx
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
````

## components/EntryForm.tsx

````tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/game/types";
export default function EntryForm({ room }: { room?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"create" | "join">(room ? "join" : "create");
  const [name, setName] = useState("");
  const [id, setId] = useState(room ?? "");
  const [color, setColor] = useState(COLORS[0]);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const roomId = id.trim().toUpperCase();
      const res = await fetch(
        mode === "create" ? "/api/rooms" : `/api/rooms/${roomId}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            ...(mode === "create"
              ? { color, duration }
              : {
                  token: localStorage.getItem(`turista:${roomId}`) ?? undefined,
                }),
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const target = data.id ?? roomId;
      localStorage.setItem(`turista:${target}`, data.playerToken);
      if (room) window.location.reload();
      else router.push(`/sala/${target}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo conectar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="entry panel">
      {!room && (
        <div className="tabs">
          <button
            type="button"
            aria-pressed={mode === "create"}
            onClick={() => setMode("create")}
          >
            Crear sala
          </button>
          <button
            type="button"
            aria-pressed={mode === "join"}
            onClick={() => setMode("join")}
          >
            Unirse a sala
          </button>
        </div>
      )}
      <h2>
        {mode === "create" ? "Tu próxima gran aventura" : "Tu lugar en la mesa"}
      </h2>
      <label>
        Tu nombre
        <input
          required
          maxLength={24}
          autoComplete="nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="¿Cómo te llamas?"
        />
      </label>
      {mode === "join" ? (
        <label>
          ID de sala
          <input
            required
            pattern="[A-HJ-NP-Z2-9]{6}"
            maxLength={6}
            value={id}
            onChange={(e) => setId(e.target.value.toUpperCase())}
            placeholder="ABC234"
          />
        </label>
      ) : (
        <>
          <fieldset>
            <legend>Elige tu avión</legend>
            <div className="colors">
              {COLORS.map((c, i) => (
                <button
                  type="button"
                  key={c}
                  style={{ background: c }}
                  aria-label={`Color ${i + 1}`}
                  aria-pressed={color === c}
                  onClick={() => setColor(c)}
                >
                  ✈
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            Duración
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={0}>Hasta el último viajero</option>
              {[30, 60, 90].map((n) => (
                <option key={n} value={n}>
                  {n} minutos
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <button className="primary" disabled={busy}>
        {busy
          ? "Preparando el viaje…"
          : mode === "create"
            ? "Crear mi sala ↗"
            : "Entrar a la sala ↗"}
      </button>
      <small>De 2 a 6 amigos. Una sala, todo el mundo.</small>
    </form>
  );
}
````

## components/Log.tsx

````tsx
export default function Log({ events }: { events: string[] }) {
  return (
    <section className="panel">
      <h2>Bitácora de viaje</h2>
      <ol className="log" aria-live="polite">
        {events
          .slice()
          .reverse()
          .map((event, i) => (
            <li key={`${events.length - i}-${event}`}>{event}</li>
          ))}
      </ol>
    </section>
  );
}
````

## components/PlayerPanel.tsx

````tsx
import { BOARD } from "@/lib/game/board";
import { liquidationValue, netWorth } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
import Dice from "./Dice";
export default function PlayerPanel({
  game,
  me,
  busy,
  send,
  onTrade,
  onSelect,
}: {
  game: Game;
  me: Player;
  busy: boolean;
  send: (a: Action) => void;
  onTrade: () => void;
  onSelect: (id: number) => void;
}) {
  const active = game.players[game.turn],
    mine = active.id === me.id && !me.bankrupt;
  const debt = mine ? game.debt : null;
  const button = (
    label: string,
    action: Action,
    reason: string | null = null,
  ) => (
    <div>
      <button
        className="primary"
        disabled={busy || !!reason}
        title={reason ?? ""}
        onClick={() => send(action)}
      >
        {label}
      </button>
      {reason && <small>{reason}</small>}
    </div>
  );
  return (
    <section className="panel player-panel">
      <p className="eyebrow">{mine ? "TU TURNO" : `TURNO DE ${active.name}`}</p>
      <div className="row">
        <h2>{me.name}</h2>
        <span className="balance">${me.money.toLocaleString("es-MX")}</span>
      </div>
      <small>
        Patrimonio neto: ${netWorth(game, me).toLocaleString("es-MX")}
      </small>
      <Dice values={game.dice} />
      {me.jailed > 0 && (
        <p>Oceanía: quedan {me.jailed} turnos. Tira para intentar dobles.</p>
      )}
      {me.bankrupt ? (
        <p>Terminó tu viaje. Puedes seguir viendo la partida.</p>
      ) : (
        <div className="actions">
          {debt ? (
            <>
              <p className="error">
                Deuda: ${debt.amount}. Vende edificios, hipoteca o devuelve
                propiedades desde sus tarjetas.
              </p>
              {button(
                "Liquidar deuda",
                { type: "settle" },
                me.money < debt.amount
                  ? "Necesitas reunir el importe completo."
                  : null,
              )}
              {button(
                "Declarar quiebra",
                { type: "bankrupt" },
                liquidationValue(game, me) >= debt.amount
                  ? "Tus activos aún cubren la deuda."
                  : Object.values(game.properties).some(
                        (a) =>
                          a.owner === me.id &&
                          (a.buildings > 0 || !a.mortgaged),
                      )
                    ? "Primero vende edificios e hipoteca o devuelve propiedades."
                    : null,
              )}
            </>
          ) : (
            <>
              {game.phase === "roll" &&
                button(
                  "Tirar dados",
                  { type: "roll" },
                  mine ? null : "Espera tu turno.",
                )}
              {mine && game.phase === "buy" && (
                <>
                  {button(
                    `Comprar ${BOARD[me.position].name} · $${BOARD[me.position].price}`,
                    { type: "buy" },
                    me.money < BOARD[me.position].price
                      ? "Saldo insuficiente."
                      : null,
                  )}
                  {button("Declinar compra", { type: "decline" })}
                </>
              )}
              {game.phase === "end" &&
                button(
                  game.extra ? "Continuar · tiro extra" : "Terminar turno",
                  { type: "end" },
                  mine ? null : "Espera tu turno.",
                )}
              {mine &&
                me.jailed > 0 &&
                me.passes.length > 0 &&
                game.phase === "roll" &&
                button("Usar salida de Oceanía", { type: "pass" })}
              <button
                onClick={onTrade}
                disabled={!mine || busy}
                title={!mine ? "Espera tu turno." : ""}
              >
                Proponer trato
              </button>
            </>
          )}
        </div>
      )}
      <h3>Tus propiedades</h3>
      <div className="owned">
        {BOARD.filter((b) => game.properties[b.id]?.owner === me.id).map(
          (b) => (
            <button
              key={b.id}
              style={{ borderLeftColor: b.color ?? "#777" }}
              onClick={() => onSelect(b.id)}
            >
              {b.name}
              <span>
                {game.properties[b.id].mortgaged
                  ? "H"
                  : game.properties[b.id].buildings === 5
                    ? "🏨"
                    : game.properties[b.id].buildings
                      ? "🍴" + game.properties[b.id].buildings
                      : ""}
              </span>
            </button>
          ),
        )}
        {!Object.values(game.properties).some((a) => a.owner === me.id) && (
          <small>Tu primera escala te espera.</small>
        )}
      </div>
    </section>
  );
}
````

## components/PropertyCard.tsx

````tsx
import { BOARD } from "@/lib/game/board";
import { assetError } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
export default function PropertyCard({
  id,
  game,
  me,
  send,
  busy,
}: {
  id: number;
  game: Game;
  me: Player | undefined;
  send: (a: Action) => void;
  busy: boolean;
}) {
  const b = BOARD[id],
    a = game.properties[id],
    owner = game.players.find((p) => p.id === a?.owner);
  return (
    <section
      className="panel property"
      style={{ borderTopColor: b.color ?? "#175344" }}
    >
      <p className="eyebrow">{b.group ?? "ESCALA DEL VIAJE"}</p>
      <h2>{b.name}</h2>
      {b.price ? (
        <>
          <p>
            {owner ? `Propiedad de ${owner.name}` : "Disponible en el Banco"}
            {a?.mortgaged ? " · Hipotecada" : ""}
          </p>
          <dl>
            <div>
              <dt>Compra</dt>
              <dd>${b.price}</dd>
            </div>
            <div>
              <dt>Hipoteca</dt>
              <dd>${b.mortgage}</dd>
            </div>
            {b.buildCost > 0 && (
              <div>
                <dt>Por edificio</dt>
                <dd>${b.buildCost}</dd>
              </div>
            )}
          </dl>
          <div className="rent-list">
            {b.rents.map((r, i) => (
              <span key={i}>
                {b.kind === "country"
                  ? [
                      "Base",
                      "1 restaurante",
                      "2 restaurantes",
                      "3 restaurantes",
                      "4 restaurantes",
                      "Hotel",
                    ][i]
                  : b.kind === "airline"
                    ? `${i + 1} aerolínea(s)`
                    : `${i + 1} servicio(s)`}
                <b>{b.kind === "utility" ? `${r} × dados` : `$${r}`}</b>
              </span>
            ))}
          </div>
          {b.kind === "country" && (
            <small>
              Renta base doble con el grupo completo. Edificios vendidos al
              Banco a mitad de precio.
            </small>
          )}
          {me && a?.owner === me.id && game.status === "playing" && (
            <div className="asset-actions">
              {(["build", "sell", "mortgage", "redeem", "return"] as const).map(
                (type) => {
                  const reason =
                    game.players[game.turn].id !== me.id
                      ? "Espera tu turno."
                      : assetError(game, me, id, type);
                  return (
                    <div key={type}>
                      <button
                        disabled={busy || !!reason}
                        title={reason ?? ""}
                        onClick={() => send({ type, square: id })}
                      >
                        {
                          {
                            build: "Construir",
                            sell: "Vender edificio",
                            mortgage: "Hipotecar",
                            redeem: "Deshipotecar",
                            return: "Devolver al Banco",
                          }[type]
                        }
                      </button>
                      {reason && <small>{reason}</small>}
                    </div>
                  );
                },
              )}
            </div>
          )}
        </>
      ) : (
        <p>
          {b.kind === "oceania"
            ? "Al caer aquí pierdes tres turnos. Los dobles permiten salir antes."
            : b.kind === "start"
              ? "Cobra $200 al pasar o caer aquí."
              : b.kind === "tax"
                ? `Paga $${b.tax} al Banco.`
                : b.kind === "go-oceania"
                  ? "Viaja a Oceanía sin cobrar por México."
                  : b.kind === "rest"
                    ? "Respira. Aquí no se paga."
                    : "Roba una carta y sigue sus instrucciones."}
        </p>
      )}
    </section>
  );
}
````

## components/Room.tsx

````tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Action, Game } from "@/lib/game/types";
import { COLORS } from "@/lib/game/types";
import { BOARD } from "@/lib/game/board";
import { netWorth } from "@/lib/game/rules";
import Board from "./Board";
import EntryForm from "./EntryForm";
import PropertyCard from "./PropertyCard";
import PlayerPanel from "./PlayerPanel";
import TradeModal from "./TradeModal";
import Log from "./Log";
export default function Room({ id }: { id: string }) {
  const [game, setGame] = useState<Game | null>(null),
    [token, setToken] = useState<string | null>(null),
    [playerId, setPlayerId] = useState<string | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [loaded, setLoaded] = useState(false),
    [missing, setMissing] = useState(false),
    [selected, setSelected] = useState(0),
    [tradeOpen, setTradeOpen] = useState(false),
    [inactive, setInactive] = useState(0),
    [notice, setNotice] = useState(""),
    [sound, setSound] = useState(false),
    [now, setNow] = useState(Date.now());
  const state = useRef<Game | null>(null),
    heartbeat = useRef(0),
    inFlight = useRef(false),
    actionFlight = useRef(false);
  const apply = useCallback((next: Game) => {
    if (!state.current || next.version >= state.current.version) {
      state.current = next;
      setGame(next);
    }
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem(`turista:${id}`));
    setSound(localStorage.getItem("turista:sound") === "1");
    setLoaded(true);
  }, [id]);
  const refresh = useCallback(async () => {
    if (document.hidden || inFlight.current || !loaded) return;
    inFlight.current = true;
    try {
      const pulse = Date.now() - heartbeat.current > 20000;
      const response = await fetch(
        `/api/rooms/${id}?since=${state.current?.version ?? 0}`,
        {
          cache: "no-store",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                "x-heartbeat": pulse ? "1" : "0",
              }
            : {},
          signal: AbortSignal.timeout(12000),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) setMissing(true);
        throw new Error(data.error);
      }
      if (pulse) heartbeat.current = Date.now();
      if (data.game) apply(data.game);
      setPlayerId(data.playerId);
      setInactive(data.inactiveFor ?? 0);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reconectando…");
    } finally {
      inFlight.current = false;
    }
  }, [id, token, loaded, apply]);
  useEffect(() => {
    if (!loaded) return;
    void refresh();
    const timer = setInterval(() => {
      setNow(Date.now());
      void refresh();
    }, 1000);
    const visible = () => {
      if (!document.hidden) void refresh();
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [loaded, refresh]);
  const send = async (action: Action): Promise<boolean> => {
    if (!token || !state.current || actionFlight.current) return false;
    actionFlight.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/rooms/${id}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          action,
          version: state.current.version,
          requestId: crypto.randomUUID(),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok) {
        void refresh();
        throw new Error(data.error);
      }
      apply(data.game);
      if (sound && action.type === "roll") {
        const audio = new AudioContext();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        gain.gain.value = 0.04;
        osc.frequency.value = 600;
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start();
        osc.stop(audio.currentTime + 0.12);
        osc.onended = () => void audio.close();
      }
      return true;
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo enviar. Reconectando…",
      );
      return false;
    } finally {
      setBusy(false);
      actionFlight.current = false;
    }
  };
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Copiado. Ya puedes invitar a tus amigos.");
    } catch {
      setNotice(`Copia este dato: ${value}`);
    }
  };
  if (missing)
    return (
      <main className="empty panel">
        <h1>Sala no encontrada</h1>
        <p>Revisa el ID. Las salas vencen después de 24 horas sin acciones.</p>
        <Link href="/">Volver al inicio</Link>
      </main>
    );
  if (!game)
    return (
      <main className="empty panel">
        <h1>Preparando tu viaje…</h1>
        <p role="status">{error || "Conectando con la sala."}</p>
        <Link href="/">Volver al inicio</Link>
      </main>
    );
  const me = game.players.find((p) => p.id === playerId),
    host = playerId === game.host;
  const seconds = game.endsAt
    ? Math.max(0, Math.ceil((game.endsAt - now) / 1000))
    : null;
  return (
    <main className="room">
      <header className="room-header">
        <Link href="/" className="brand">
          ✈ TURISTA MUNDIAL
        </Link>
        <div className="room-code">
          <span>
            SALA <b>{id}</b>
          </span>
          <button onClick={() => void copy(id)}>Copiar ID</button>
          <button
            onClick={() => void copy(`${window.location.origin}/sala/${id}`)}
          >
            Copiar link
          </button>
        </div>
        <button
          aria-pressed={sound}
          onClick={() => {
            setSound(!sound);
            localStorage.setItem("turista:sound", sound ? "0" : "1");
          }}
        >
          Sonido {sound ? "activado" : "apagado"}
        </button>
      </header>
      {notice && (
        <p role="status" className="notice">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {game.status === "finished" && (
        <section className="victory panel">
          <p className="eyebrow">VIAJE COMPLETADO</p>
          <h1>
            {game.winner
              .map((w) => game.players.find((p) => p.id === w)?.name)
              .join(" y ")}{" "}
            {game.winner.length > 1 ? "ganan" : "gana"} la partida
          </h1>
          {game.players.map((p) => (
            <p key={p.id}>
              {p.name}: $
              {(
                netWorth(game, p) -
                (game.debt && game.players[game.turn].id === p.id
                  ? game.debt.amount
                  : 0)
              ).toLocaleString("es-MX")}
              {p.bankrupt ? " · En quiebra" : ""}
            </p>
          ))}
          <Link href="/">Organizar la revancha ↗</Link>
        </section>
      )}
      {game.status === "lobby" ? (
        <div className="lobby-grid">
          <section className="panel lobby">
            <p className="eyebrow">SALA DE ABORDAJE</p>
            <h1>
              El viaje empieza
              <br />
              con tus amigos.
            </h1>
            <p>
              Comparte el ID <b>{id}</b>. Necesitan de 2 a 6 jugadores.
            </p>
            <p>
              {game.duration
                ? `Partida de ${game.duration} minutos.`
                : "Gana el último jugador que siga en pie."}
            </p>
            <ul className="passengers">
              {game.players.map((p) => (
                <li key={p.id}>
                  <span style={{ background: p.color }}>✈</span>
                  <b>{p.name}</b>
                  <small>
                    {p.id === game.host ? "Anfitrión" : "Listo para viajar"}
                  </small>
                </li>
              ))}
            </ul>
            {me && (
              <>
                <fieldset>
                  <legend>Tu avión</legend>
                  <div className="colors">
                    {COLORS.map((c, i) => (
                      <button
                        key={c}
                        aria-label={`Color ${i + 1}`}
                        aria-pressed={me.color === c}
                        style={{ background: c }}
                        disabled={
                          busy ||
                          game.players.some(
                            (p) => p.id !== me.id && p.color === c,
                          )
                        }
                        onClick={() => void send({ type: "color", color: c })}
                      >
                        ✈
                      </button>
                    ))}
                  </div>
                </fieldset>
                {host ? (
                  <>
                    <button
                      className="primary"
                      disabled={busy || game.players.length < 2}
                      onClick={() => void send({ type: "start" })}
                    >
                      Iniciar partida
                    </button>
                    {game.players.length < 2 && (
                      <small>Espera a que llegue al menos un amigo.</small>
                    )}
                  </>
                ) : (
                  <p>El anfitrión iniciará la partida.</p>
                )}
              </>
            )}
          </section>
          {!me && !token ? (
            <EntryForm room={id} />
          ) : (
            <section className="panel guide">
              <h2>Antes de despegar</h2>
              <p>Todos empiezan con $1,500. Cobra $200 al pasar por México.</p>
              <p>
                Compra países y completa grupos para construir restaurantes.
                Cinco construcciones se convierten en un hotel.
              </p>
              <p>
                Oceanía implica tres turnos de espera. Los dobles o una carta te
                sacan antes.
              </p>
              <p>Selecciona cualquier casilla para consultar su tarjeta.</p>
            </section>
          )}
        </div>
      ) : (
        <>
          <div className="status-strip">
            <span>
              <i style={{ background: game.players[game.turn].color }} />
              Turno de <b>{game.players[game.turn].name}</b>
            </span>
            {seconds !== null && (
              <span>
                Tiempo: {Math.floor(seconds / 60)}:
                {String(seconds % 60).padStart(2, "0")}
              </span>
            )}
            <span>Versión {game.version}</span>
          </div>
          <div className="game-layout">
            <section>
              <Board game={game} onSelect={setSelected} />
              <div className="players-strip">
                {game.players.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      borderColor: p.color,
                      opacity: p.bankrupt ? 0.5 : 1,
                    }}
                  >
                    <b>{p.name}</b>
                    <span>
                      {p.bankrupt
                        ? "En quiebra"
                        : `$${p.money.toLocaleString("es-MX")}`}
                    </span>
                  </div>
                ))}
              </div>
              <Log events={game.log} />
            </section>
            <aside>
              {me && game.status === "playing" && (
                <PlayerPanel
                  game={game}
                  me={me}
                  busy={busy}
                  send={(a) => void send(a)}
                  onTrade={() => setTradeOpen(true)}
                  onSelect={setSelected}
                />
              )}
              <PropertyCard
                id={selected}
                game={game}
                me={me}
                send={(a) => void send(a)}
                busy={busy}
              />
              {game.trades
                .filter((t) => t.to === playerId || t.from === playerId)
                .map((t) => (
                  <section className="panel" key={t.id}>
                    <h2>Propuesta de trato</h2>
                    <p>
                      {game.players.find((p) => p.id === t.from)?.name} ofrece $
                      {t.giveMoney} y{" "}
                      {t.give.map((i) => BOARD[i].name).join(", ") ||
                        "ninguna propiedad"}
                      .
                    </p>
                    <p>
                      Pide ${t.takeMoney} y{" "}
                      {t.take.map((i) => BOARD[i].name).join(", ") ||
                        "ninguna propiedad"}
                      .
                    </p>
                    {t.to === playerId && (
                      <button
                        className="primary"
                        disabled={busy || !!game.debt}
                        onClick={() =>
                          void send({ type: "accept", trade: t.id })
                        }
                      >
                        Aceptar trato
                      </button>
                    )}
                    <button
                      disabled={busy}
                      onClick={() => void send({ type: "reject", trade: t.id })}
                    >
                      {t.from === playerId ? "Cancelar" : "Rechazar"}
                    </button>
                  </section>
                ))}
              {host && game.status === "playing" && inactive >= 90000 && (
                <section className="panel">
                  <h2>Jugador sin conexión</h2>
                  <p>Sin responder por más de 90 segundos.</p>
                  <button
                    disabled={busy || !!game.debt}
                    onClick={() => void send({ type: "skip" })}
                  >
                    Saltar turno
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => {
                      if (
                        window.confirm(
                          "¿Declarar en quiebra al jugador inactivo?",
                        )
                      )
                        void send({ type: "expel" });
                    }}
                  >
                    Declarar quiebra
                  </button>
                </section>
              )}
            </aside>
          </div>
        </>
      )}
      {tradeOpen && me && (
        <TradeModal
          game={game}
          me={me}
          send={send}
          onClose={() => setTradeOpen(false)}
        />
      )}
      <footer>
        Reglas y valores adaptados · Selecciona una casilla para conocer sus
        detalles.
      </footer>
    </main>
  );
}
````

## components/TradeModal.tsx

````tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { BOARD } from "@/lib/game/board";
import { group } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
export default function TradeModal({
  game,
  me,
  onClose,
  send,
}: {
  game: Game;
  me: Player;
  onClose: () => void;
  send: (a: Action) => Promise<boolean>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const others = game.players.filter((p) => p.id !== me.id && !p.bankrupt);
  const [to, setTo] = useState(others[0]?.id ?? "");
  const [give, setGive] = useState<number[]>([]);
  const [take, setTake] = useState<number[]>([]);
  const [gm, setGm] = useState(0);
  const [tm, setTm] = useState(0);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  const properties = (owner: string) =>
    BOARD.filter(
      (b) =>
        game.properties[b.id]?.owner === owner &&
        !game.properties[b.id].buildings &&
        !group(b.id).some((x) => game.properties[x.id].buildings),
    );
  return (
    <dialog ref={dialog} onCancel={onClose} className="trade-modal">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          if (
            await send({
              type: "trade",
              to,
              give,
              take,
              giveMoney: gm,
              takeMoney: tm,
            })
          )
            onClose();
          setBusy(false);
        }}
      >
        <div className="row">
          <h2>Hagamos un trato</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>
        <label>
          Negociar con
          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setTake([]);
            }}
          >
            {others.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <div className="trade-columns">
          {[
            {
              title: "Tú ofreces",
              owner: me.id,
              selected: give,
              set: setGive,
              money: gm,
              setMoney: setGm,
            },
            {
              title: "Tú pides",
              owner: to,
              selected: take,
              set: setTake,
              money: tm,
              setMoney: setTm,
            },
          ].map((side) => (
            <fieldset key={side.title}>
              <legend>{side.title}</legend>
              <label>
                Dinero
                <input
                  type="number"
                  min={0}
                  max={
                    game.players.find((p) => p.id === side.owner)?.money ?? 0
                  }
                  value={side.money}
                  onChange={(e) => side.setMoney(Number(e.target.value))}
                />
              </label>
              {properties(side.owner).map((b) => (
                <label key={b.id} className="checkbox">
                  <input
                    type="checkbox"
                    checked={side.selected.includes(b.id)}
                    onChange={(e) =>
                      side.set(
                        e.target.checked
                          ? [...side.selected, b.id]
                          : side.selected.filter((id) => id !== b.id),
                      )
                    }
                  />
                  {b.name}
                  {game.properties[b.id].mortgaged ? " (hipotecada)" : ""}
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <p>
          Solo propiedades de grupos sin edificios. Las hipotecas se transfieren
          y conservan su costo de liberación.
        </p>
        <button className="primary" disabled={busy || !to}>
          Enviar propuesta
        </button>
      </form>
    </dialog>
  );
}
````

## lib/game/board.ts

````typescript
import type { Square, SquareKind } from "./types";
// VERIFICAR: adaptación no oficial. Nombres, distribución, precios y rentas editables aquí.
const special = (
  id: number,
  name: string,
  kind: SquareKind,
  tax = 0,
): Square => ({
  id,
  name,
  kind,
  price: 0,
  mortgage: 0,
  rents: [],
  buildCost: 0,
  tax,
});
const country = (
  id: number,
  name: string,
  group: string,
  color: string,
  price: number,
  rents: number[],
  buildCost: number,
): Square => ({
  id,
  name,
  kind: "country",
  group,
  color,
  price,
  mortgage: price / 2,
  rents,
  buildCost,
});
const airline = (id: number, name: string): Square => ({
  ...special(id, name, "airline"),
  price: 200,
  mortgage: 100,
  rents: [25, 50, 100, 200],
});
const utility = (id: number, name: string): Square => ({
  ...special(id, name, "utility"),
  price: 150,
  mortgage: 75,
  rents: [4, 10],
});
export const BOARD: Square[] = [
  special(0, "México", "start"),
  country(
    1,
    "Guatemala",
    "Centroamérica",
    "#8c6049",
    60,
    [2, 10, 30, 90, 160, 250],
    50,
  ),
  special(2, "E-Mail", "email"),
  country(
    3,
    "Costa Rica",
    "Centroamérica",
    "#8c6049",
    60,
    [4, 20, 60, 180, 320, 450],
    50,
  ),
  special(4, "Impuesto de salida", "tax", 200),
  airline(5, "Aeroméxico"),
  country(
    6,
    "Colombia",
    "Sudamérica",
    "#68b7c8",
    100,
    [6, 30, 90, 270, 400, 550],
    50,
  ),
  special(7, "SMS", "sms"),
  country(
    8,
    "Perú",
    "Sudamérica",
    "#68b7c8",
    100,
    [6, 30, 90, 270, 400, 550],
    50,
  ),
  country(
    9,
    "Brasil",
    "Sudamérica",
    "#68b7c8",
    120,
    [8, 40, 100, 300, 450, 600],
    50,
  ),
  special(10, "Oceanía / Australia", "oceania"),
  country(
    11,
    "España",
    "Mediterráneo",
    "#bd5893",
    140,
    [10, 50, 150, 450, 625, 750],
    100,
  ),
  utility(12, "Internet mundial"),
  country(
    13,
    "Portugal",
    "Mediterráneo",
    "#bd5893",
    140,
    [10, 50, 150, 450, 625, 750],
    100,
  ),
  country(
    14,
    "Italia",
    "Mediterráneo",
    "#bd5893",
    160,
    [12, 60, 180, 500, 700, 900],
    100,
  ),
  airline(15, "Lufthansa"),
  country(
    16,
    "Egipto",
    "África",
    "#e69236",
    180,
    [14, 70, 200, 550, 750, 950],
    100,
  ),
  special(17, "E-Mail", "email"),
  country(
    18,
    "Marruecos",
    "África",
    "#e69236",
    180,
    [14, 70, 200, 550, 750, 950],
    100,
  ),
  country(
    19,
    "Sudáfrica",
    "África",
    "#e69236",
    200,
    [16, 80, 220, 600, 800, 1000],
    100,
  ),
  special(20, "Descanso", "rest"),
  country(
    21,
    "India",
    "Asia",
    "#d95446",
    220,
    [18, 90, 250, 700, 875, 1050],
    150,
  ),
  special(22, "SMS", "sms"),
  country(
    23,
    "Tailandia",
    "Asia",
    "#d95446",
    220,
    [18, 90, 250, 700, 875, 1050],
    150,
  ),
  country(
    24,
    "China",
    "Asia",
    "#d95446",
    240,
    [20, 100, 300, 750, 925, 1100],
    150,
  ),
  airline(25, "Air France"),
  country(
    26,
    "Alemania",
    "Europa",
    "#e5bc39",
    260,
    [22, 110, 330, 800, 975, 1150],
    150,
  ),
  country(
    27,
    "Francia",
    "Europa",
    "#e5bc39",
    260,
    [22, 110, 330, 800, 975, 1150],
    150,
  ),
  utility(28, "Energía mundial"),
  country(
    29,
    "Reino Unido",
    "Europa",
    "#e5bc39",
    280,
    [24, 120, 360, 850, 1025, 1200],
    150,
  ),
  special(30, "Ve a Oceanía", "go-oceania"),
  country(
    31,
    "Corea del Sur",
    "Pacífico",
    "#35936b",
    300,
    [26, 130, 390, 900, 1100, 1275],
    200,
  ),
  country(
    32,
    "Japón",
    "Pacífico",
    "#35936b",
    300,
    [26, 130, 390, 900, 1100, 1275],
    200,
  ),
  special(33, "E-Mail", "email"),
  country(
    34,
    "Nueva Zelanda",
    "Pacífico",
    "#35936b",
    320,
    [28, 150, 450, 1000, 1200, 1400],
    200,
  ),
  airline(35, "Japan Airlines"),
  special(36, "SMS", "sms"),
  country(
    37,
    "Canadá",
    "Norteamérica",
    "#345990",
    350,
    [35, 175, 500, 1100, 1300, 1500],
    200,
  ),
  special(38, "Impuesto de lujo", "tax", 100),
  country(
    39,
    "Estados Unidos",
    "Norteamérica",
    "#345990",
    400,
    [50, 200, 600, 1400, 1700, 2000],
    200,
  ),
];
````

## lib/game/cards.ts

````typescript
export type Card = { text: string } & (
  | { kind: "money"; amount: number }
  | { kind: "move"; target: number }
  | { kind: "jail" | "pass" }
  | { kind: "repairs"; restaurant: number; hotel: number }
);
export const CARDS: Record<"email" | "sms", Card[]> = {
  email: [
    { text: "La tanda sí pagó. Cobra $200.", kind: "money", amount: 200 },
    {
      text: "Tu maleta decidió viajar aparte. Paga $50.",
      kind: "money",
      amount: -50,
    },
    {
      text: "Regresa a México por unos tacos. Cobra la salida.",
      kind: "move",
      target: 0,
    },
    { text: "Escala de tres turnos en Oceanía. Ni modo.", kind: "jail" },
    {
      text: "Tu prima conoce al piloto. Guarda una salida de Oceanía.",
      kind: "pass",
    },
    {
      text: "Mantenimiento: $25 por restaurante y $100 por hotel.",
      kind: "repairs",
      restaurant: 25,
      hotel: 100,
    },
    { text: "Reembolso del vuelo. Cobra $100.", kind: "money", amount: 100 },
    {
      text: "Te tocó pagar el mariachi. Paga $80.",
      kind: "money",
      amount: -80,
    },
    {
      text: "Tu reseña de chilaquiles se hizo viral. Cobra $150.",
      kind: "money",
      amount: 150,
    },
    {
      text: "Visita Francia. Si pasas México, cobra $200.",
      kind: "move",
      target: 27,
    },
    {
      text: "Promo de Aeroméxico. Avanza a su casilla.",
      kind: "move",
      target: 5,
    },
    { text: "Vendiste tus millas. Cobra $50.", kind: "money", amount: 50 },
    { text: "El roaming no perdona. Paga $100.", kind: "money", amount: -100 },
    {
      text: "Premio al mejor anfitrión. Cobra $75.",
      kind: "money",
      amount: 75,
    },
    { text: "Renovación de pasaporte. Paga $60.", kind: "money", amount: -60 },
    {
      text: "Tu tía te mandó para el viaje. Cobra $120.",
      kind: "money",
      amount: 120,
    },
  ],
  sms: [
    {
      text: "Depósito recibido: la quincena. Cobra $150.",
      kind: "money",
      amount: 150,
    },
    {
      text: "Invitaste las quesadillas. Paga $40.",
      kind: "money",
      amount: -40,
    },
    {
      text: "México te extraña. Regresa y cobra la salida.",
      kind: "move",
      target: 0,
    },
    { text: "Vuelo equivocado: destino Oceanía.", kind: "jail" },
    {
      text: "Pase de salida de Oceanía. Guárdalo para la escala.",
      kind: "pass",
    },
    {
      text: "Fumigación: $40 por restaurante y $115 por hotel.",
      kind: "repairs",
      restaurant: 40,
      hotel: 115,
    },
    {
      text: "Bono de viajero frecuente. Cobra $100.",
      kind: "money",
      amount: 100,
    },
    { text: "Se rompió la pantalla. Paga $120.", kind: "money", amount: -120 },
    { text: "Visita Japón por un ramen.", kind: "move", target: 32 },
    {
      text: "Escápate a España. Cobra si pasas México.",
      kind: "move",
      target: 11,
    },
    {
      text: "Ganaste la rifa de la oficina. Cobra $200.",
      kind: "money",
      amount: 200,
    },
    {
      text: "Exceso de equipaje: llevabas el molcajete. Paga $75.",
      kind: "money",
      amount: -75,
    },
    { text: "Te devolvieron el cambio. Cobra $25.", kind: "money", amount: 25 },
    { text: "Propina para el guía. Paga $30.", kind: "money", amount: -30 },
    { text: "Vendiste las postales. Cobra $60.", kind: "money", amount: 60 },
    { text: "Reservación cancelada. Paga $150.", kind: "money", amount: -150 },
  ],
};
````

## lib/game/engine.ts

````typescript
import { BOARD } from "./board";
import { CARDS } from "./cards";
import { assetError, group, liquidationValue, netWorth, rent } from "./rules";
import {
  COLORS,
  type Action,
  type Context,
  type Game,
  type Player,
} from "./types";
function requireRule(ok: unknown, message: string): asserts ok {
  if (!ok) throw new Error(message);
}
export function addLog(s: Game, text: string) {
  s.log = [...s.log, text].slice(-50);
}
export function newGame(id: string, host: Player, duration: number): Game {
  return {
    id,
    version: 1,
    host: host.id,
    status: "lobby",
    players: [host],
    properties: Object.fromEntries(
      BOARD.filter((b) => b.price).map((b) => [
        b.id,
        { owner: null, buildings: 0, mortgaged: false },
      ]),
    ),
    turn: 0,
    phase: "roll",
    doubles: 0,
    extra: false,
    dice: [1, 1],
    debt: null,
    trades: [],
    decks: { email: [], sms: [] },
    log: [`${host.name} creó la sala.`],
    duration,
    endsAt: null,
    turnAt: 0,
    winner: [],
    motion: null,
    lastCard: null,
  };
}
export function newPlayer(id: string, name: string, color: string): Player {
  return {
    id,
    name,
    color,
    money: 1500,
    position: 0,
    jailed: 0,
    bankrupt: false,
    passes: [],
  };
}
function nextTurn(s: Game, now: number) {
  s.trades = [];
  s.debt = null;
  s.doubles = 0;
  s.extra = false;
  s.phase = "roll";
  s.turnAt = now;
  for (let i = 0; i < s.players.length; i++) {
    s.turn = (s.turn + 1) % s.players.length;
    if (!s.players[s.turn].bankrupt) break;
  }
}
export function finishByTime(state: Game, now: number): Game {
  if (state.status !== "playing" || !state.endsAt || now < state.endsAt)
    return state;
  const s = structuredClone(state),
    active = s.players.filter((p) => !p.bankrupt);
  const score = (p: Player) =>
    netWorth(s, p) -
    (s.debt && s.players[s.turn].id === p.id ? s.debt.amount : 0);
  const best = Math.max(...active.map(score));
  s.winner = active.filter((p) => score(p) === best).map((p) => p.id);
  s.status = "finished";
  s.trades = [];
  addLog(s, "Terminó el tiempo. Se compara el patrimonio neto.");
  return s;
}
function winner(s: Game) {
  const alive = s.players.filter((p) => !p.bankrupt);
  if (alive.length === 1) {
    s.status = "finished";
    s.winner = [alive[0].id];
    s.trades = [];
    addLog(s, `${alive[0].name} ganó la partida.`);
  }
}
function charge(s: Game, p: Player, amount: number, creditor: string | null) {
  if (amount <= 0) return;
  if (p.money < amount) {
    s.debt = { amount, creditor };
    addLog(s, `${p.name} debe $${amount}. Debe liquidar sus activos.`);
    return;
  }
  p.money -= amount;
  const recipient = s.players.find((x) => x.id === creditor);
  if (recipient) recipient.money += amount;
  addLog(
    s,
    `${p.name} pagó $${amount}${recipient ? ` de renta a ${recipient.name}` : " al Banco"}.`,
  );
}
function jail(s: Game, p: Player, viaBoard = false) {
  p.position = 10;
  p.jailed = 3;
  s.extra = false;
  s.doubles = 0;
  s.phase = "end";
  s.motion = {
    serial: (s.motion?.serial ?? 0) + 1,
    player: p.id,
    path: [...(viaBoard ? (s.motion?.path ?? []) : []), 10],
  };
  addLog(s, `${p.name} va a Oceanía por tres turnos.`);
}
function move(s: Game, p: Player, steps: number) {
  const path: number[] = [];
  for (let i = 0; i < steps; i++) {
    p.position = (p.position + 1) % 40;
    path.push(p.position);
    if (p.position === 0) {
      p.money += 200;
      addLog(s, `${p.name} pasó por México y cobró $200.`);
    }
  }
  s.motion = { serial: (s.motion?.serial ?? 0) + 1, player: p.id, path };
}
function land(s: Game, p: Player) {
  const b = BOARD[p.position];
  s.phase = "end";
  if (b.kind === "oceania" || b.kind === "go-oceania") {
    jail(s, p, true);
    return;
  }
  if (b.kind === "tax") {
    charge(s, p, b.tax ?? 0, null);
    return;
  }
  if (b.price) {
    const a = s.properties[b.id];
    if (!a.owner) s.phase = "buy";
    else if (a.owner !== p.id)
      charge(s, p, rent(s, b.id, s.dice[0] + s.dice[1]), a.owner);
    return;
  }
  if (b.kind === "email" || b.kind === "sms") {
    const deck = s.decks[b.kind];
    const index = deck.shift();
    requireRule(index !== undefined, "Mazo vacío.");
    const c = CARDS[b.kind][index];
    s.lastCard = c.text;
    addLog(s, `${p.name} · ${b.name}: ${c.text}`);
    if (c.kind === "pass") {
      p.passes.push(b.kind);
      return;
    }
    deck.push(index);
    if (c.kind === "money") {
      if (c.amount >= 0) p.money += c.amount;
      else charge(s, p, -c.amount, null);
    }
    if (c.kind === "jail") jail(s, p, true);
    if (c.kind === "repairs") {
      const amount = Object.values(s.properties)
        .filter((a) => a.owner === p.id)
        .reduce(
          (v, a) =>
            v + (a.buildings === 5 ? c.hotel : a.buildings * c.restaurant),
          0,
        );
      charge(s, p, amount, null);
    }
    if (c.kind === "move") {
      const oldPath = s.motion?.path ?? [];
      move(s, p, (c.target - p.position + 40) % 40 || 40);
      const newPath = s.motion?.path ?? [];
      land(s, p);
      if (!p.jailed && s.motion) s.motion.path = [...oldPath, ...newPath];
    }
  }
}
function eliminate(s: Game, p: Player, creditor: string | null) {
  const recipient = s.players.find((x) => x.id === creditor && !x.bankrupt);
  if (recipient) recipient.money += p.money;
  p.money = 0;
  p.bankrupt = true;
  for (const a of Object.values(s.properties))
    if (a.owner === p.id) {
      a.owner = recipient?.id ?? null;
      if (!recipient) {
        a.buildings = 0;
        a.mortgaged = false;
      }
    }
  for (const deck of p.passes)
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
  p.passes = [];
  s.debt = null;
  addLog(s, `${p.name} se declaró en quiebra.`);
  winner(s);
}
export function engine(
  state: Game,
  action: Action,
  playerId: string,
  ctx: Context,
): Game {
  const timed = finishByTime(state, ctx.now);
  if (timed !== state) return timed;
  const s = structuredClone(state),
    p = s.players.find((x) => x.id === playerId);
  requireRule(
    p &&
      (!p.bankrupt ||
        (p.id === s.host &&
          (action.type === "skip" || action.type === "expel"))),
    "Jugador no disponible.",
  );
  if (action.type === "color") {
    requireRule(s.status === "lobby", "La partida ya inició.");
    requireRule(
      COLORS.includes(action.color) &&
        !s.players.some((x) => x.id !== p.id && x.color === action.color),
      "Color no disponible.",
    );
    p.color = action.color;
    return s;
  }
  if (action.type === "start") {
    requireRule(
      s.status === "lobby" && p.id === s.host,
      "Solo el anfitrión puede iniciar.",
    );
    requireRule(s.players.length >= 2, "Se necesitan al menos dos jugadores.");
    s.status = "playing";
    s.decks = structuredClone(ctx.shuffled);
    s.turnAt = ctx.now;
    s.endsAt = s.duration ? ctx.now + s.duration * 60000 : null;
    addLog(s, "Despegamos. Comienza la partida.");
    return s;
  }
  requireRule(s.status === "playing", "La partida no está activa.");
  if (action.type === "skip" || action.type === "expel") {
    requireRule(
      p.id === s.host && ctx.inactive,
      "Solo el anfitrión puede actuar tras 90 segundos de inactividad.",
    );
    const absent = s.players[s.turn];
    if (action.type === "expel") {
      eliminate(s, absent, s.debt?.creditor ?? null);
      if (s.status === "playing") nextTurn(s, ctx.now);
    } else {
      requireRule(
        !s.debt,
        "Hay una deuda pendiente; solo se puede declarar la quiebra.",
      );
      addLog(s, `Se saltó el turno de ${absent.name}.`);
      nextTurn(s, ctx.now);
    }
    return s;
  }
  if (action.type === "reject") {
    const t = s.trades.find((x) => x.id === action.trade);
    requireRule(
      t && (t.from === p.id || t.to === p.id),
      "Trato no disponible.",
    );
    s.trades = s.trades.filter((x) => x.id !== action.trade);
    return s;
  }
  if (action.type === "accept") {
    const t = s.trades.find((x) => x.id === action.trade);
    requireRule(t && t.to === p.id && !s.debt, "No puedes aceptar este trato.");
    const from = s.players.find((x) => x.id === t.from);
    requireRule(from && !from.bankrupt, "El oferente ya no está disponible.");
    validateTrade(s, from, p, t.give, t.take, t.giveMoney, t.takeMoney);
    from.money += t.takeMoney - t.giveMoney;
    p.money += t.giveMoney - t.takeMoney;
    for (const id of t.give) s.properties[id].owner = p.id;
    for (const id of t.take) s.properties[id].owner = from.id;
    s.trades = [];
    addLog(s, `${p.name} aceptó el trato de ${from.name}.`);
    return s;
  }
  requireRule(s.players[s.turn].id === p.id, "Espera tu turno.");
  if (action.type === "trade") {
    const to = s.players.find((x) => x.id === action.to);
    requireRule(
      to && !to.bankrupt && to.id !== p.id && !s.debt,
      "No puedes ofrecer este trato.",
    );
    validateTrade(
      s,
      p,
      to,
      action.give,
      action.take,
      action.giveMoney,
      action.takeMoney,
    );
    s.trades = [{ ...action, id: `${s.version}-${p.id}`, from: p.id }];
    addLog(s, `${p.name} propuso un trato a ${to.name}.`);
    return s;
  }
  if ("square" in action) {
    const err = assetError(s, p, action.square, action.type);
    requireRule(!err, err ?? "Acción ilegal.");
    const a = s.properties[action.square],
      b = BOARD[action.square];
    if (action.type === "build") {
      a.buildings++;
      p.money -= b.buildCost;
    }
    if (action.type === "sell") {
      a.buildings--;
      p.money += b.buildCost / 2;
    }
    if (action.type === "mortgage") {
      a.mortgaged = true;
      p.money += b.mortgage;
    }
    if (action.type === "redeem") {
      a.mortgaged = false;
      p.money -= Math.ceil(b.mortgage * 1.1);
    }
    if (action.type === "return") {
      p.money += a.mortgaged ? 0 : b.price / 2;
      a.owner = null;
      a.mortgaged = false;
    }
    const labels = {
      build: "construyó en",
      sell: "vendió un edificio de",
      mortgage: "hipotecó",
      redeem: "deshipotecó",
      return: "devolvió al Banco",
    };
    addLog(s, `${p.name} ${labels[action.type]} ${b.name}.`);
    return s;
  }
  if (action.type === "settle") {
    requireRule(
      s.debt && p.money >= s.debt.amount,
      "No tienes saldo para liquidar la deuda.",
    );
    const d = s.debt;
    s.debt = null;
    charge(s, p, d.amount, d.creditor);
    return s;
  }
  if (action.type === "bankrupt") {
    requireRule(s.debt, "No tienes una deuda pendiente.");
    requireRule(
      liquidationValue(s, p) < s.debt.amount,
      "Puedes cubrir la deuda vendiendo o hipotecando.",
    );
    requireRule(
      !Object.values(s.properties).some(
        (a) => a.owner === p.id && (a.buildings > 0 || !a.mortgaged),
      ),
      "Primero vende edificios e hipoteca o devuelve tus propiedades.",
    );
    eliminate(s, p, s.debt.creditor);
    if (s.status === "playing") nextTurn(s, ctx.now);
    return s;
  }
  requireRule(!s.debt, "Liquida tu deuda antes de continuar.");
  if (action.type === "pass") {
    requireRule(
      s.phase === "roll" && p.jailed > 0 && p.passes.length,
      "No puedes usar una salida ahora.",
    );
    const deck = p.passes.shift()!;
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
    p.jailed = 0;
    addLog(s, `${p.name} usó una salida de Oceanía.`);
    return s;
  }
  if (action.type === "roll") {
    requireRule(s.phase === "roll", "Ya tiraste los dados.");
    s.dice = ctx.dice;
    s.lastCard = null;
    const double = ctx.dice[0] === ctx.dice[1];
    addLog(s, `${p.name} tiró ${ctx.dice.join(" + ")}.`);
    if (p.jailed) {
      s.extra = false;
      if (double) {
        p.jailed = 0;
        move(s, p, ctx.dice[0] + ctx.dice[1]);
        land(s, p);
      } else {
        p.jailed--;
        s.phase = "end";
        addLog(s, `${p.name} pierde el turno en Oceanía; quedan ${p.jailed}.`);
      }
      return s;
    }
    s.doubles = double ? s.doubles + 1 : 0;
    s.extra = double;
    if (s.doubles === 3) {
      jail(s, p);
      return s;
    }
    move(s, p, ctx.dice[0] + ctx.dice[1]);
    land(s, p);
    return s;
  }
  if (action.type === "buy" || action.type === "decline") {
    requireRule(s.phase === "buy", "No hay compra pendiente.");
    if (action.type === "buy") {
      const b = BOARD[p.position],
        a = s.properties[b.id];
      requireRule(
        a && !a.owner && p.money >= b.price,
        "La propiedad no está disponible o falta saldo.",
      );
      p.money -= b.price;
      a.owner = p.id;
      addLog(s, `${p.name} compró ${b.name}.`);
    }
    s.phase = "end";
    return s;
  }
  if (action.type === "end") {
    requireRule(s.phase === "end", "Resuelve la tirada o la compra primero.");
    s.trades = [];
    if (s.extra) {
      s.phase = "roll";
      s.extra = false;
      s.turnAt = ctx.now;
    } else nextTurn(s, ctx.now);
    return s;
  }
  throw new Error("Acción desconocida.");
}
function validateTrade(
  s: Game,
  from: Player,
  to: Player,
  give: number[],
  take: number[],
  gm: number,
  tm: number,
) {
  requireRule(
    Number.isSafeInteger(gm) &&
      Number.isSafeInteger(tm) &&
      gm >= 0 &&
      tm >= 0 &&
      from.money >= gm &&
      to.money >= tm,
    "Dinero del trato inválido.",
  );
  requireRule(give.length + take.length + gm + tm > 0, "El trato está vacío.");
  requireRule(
    new Set([...give, ...take]).size === give.length + take.length,
    "Propiedad repetida.",
  );
  for (const [ids, owner] of [
    [give, from.id],
    [take, to.id],
  ] as const)
    for (const id of ids) {
      const a = s.properties[id];
      requireRule(
        a &&
          a.owner === owner &&
          !a.buildings &&
          !group(id).some((b) => s.properties[b.id].buildings),
        "Las propiedades del trato deben pertenecer al jugador y tener todo su grupo sin edificios.",
      );
    }
}
````

## lib/game/rules.ts

````typescript
import { BOARD } from "./board";
import type { Game, Player } from "./types";
export const group = (id: number) =>
  BOARD.filter((b) => b.group && b.group === BOARD[id].group);
export const complete = (s: Game, id: number, owner: string) =>
  group(id).length > 0 &&
  group(id).every((b) => s.properties[b.id].owner === owner);
export function rent(s: Game, id: number, dice: number): number {
  const b = BOARD[id],
    p = s.properties[id];
  if (!p?.owner || p.mortgaged) return 0;
  if (b.kind === "country")
    return (
      b.rents[p.buildings] *
      (p.buildings === 0 && complete(s, id, p.owner) ? 2 : 1)
    );
  const count = BOARD.filter(
    (x) => x.kind === b.kind && s.properties[x.id]?.owner === p.owner,
  ).length;
  return b.kind === "utility" ? dice * b.rents[count - 1] : b.rents[count - 1];
}
export function assetError(
  s: Game,
  player: Player,
  id: number,
  type: string,
): string | null {
  const b = BOARD[id],
    p = s.properties[id];
  if (!b || !p || p.owner !== player.id)
    return "Esta propiedad no te pertenece.";
  const peers = group(id),
    built = peers.some((x) => s.properties[x.id].buildings > 0);
  if (type === "build") {
    if (s.debt) return "Primero liquida tu deuda.";
    if (
      !complete(s, id, player.id) ||
      peers.some((x) => s.properties[x.id].mortgaged)
    )
      return "Necesitas todo el grupo sin hipotecas.";
    if (p.buildings >= 5) return "Ya tiene un hotel.";
    if (peers.some((x) => s.properties[x.id].buildings < p.buildings))
      return "Construye primero en la propiedad con menos edificios.";
    if (player.money < b.buildCost) return "Saldo insuficiente.";
  } else if (type === "sell") {
    if (!p.buildings) return "No hay edificios para vender.";
    if (peers.some((x) => s.properties[x.id].buildings > p.buildings))
      return "Vende primero en la propiedad con más edificios.";
  } else if (type === "mortgage") {
    if (p.mortgaged) return "Ya está hipotecada.";
    if (built) return "Vende todos los edificios del grupo primero.";
  } else if (type === "redeem") {
    if (s.debt) return "Primero liquida tu deuda.";
    if (!p.mortgaged) return "No está hipotecada.";
    if (player.money < Math.ceil(b.mortgage * 1.1))
      return "Saldo insuficiente.";
  } else if (type === "return" && built)
    return "Vende todos los edificios del grupo primero.";
  return null;
}
export const netWorth = (s: Game, p: Player) =>
  p.money +
  BOARD.reduce((n, b) => {
    const a = s.properties[b.id];
    return (
      n +
      (a?.owner === p.id
        ? b.price - (a.mortgaged ? b.mortgage : 0) + a.buildings * b.buildCost
        : 0)
    );
  }, 0);
export const liquidationValue = (s: Game, p: Player) =>
  p.money +
  BOARD.reduce((n, b) => {
    const a = s.properties[b.id];
    return (
      n +
      (a?.owner === p.id
        ? (a.mortgaged ? 0 : b.mortgage) + (a.buildings * b.buildCost) / 2
        : 0)
    );
  }, 0);
````

## lib/game/types.ts

````typescript
export type SquareKind =
  | "start"
  | "country"
  | "airline"
  | "utility"
  | "email"
  | "sms"
  | "tax"
  | "oceania"
  | "rest"
  | "go-oceania";
export interface Square {
  id: number;
  name: string;
  kind: SquareKind;
  price: number;
  mortgage: number;
  group?: string;
  color?: string;
  rents: number[];
  buildCost: number;
  tax?: number;
}
export interface Property {
  owner: string | null;
  buildings: number;
  mortgaged: boolean;
}
export interface Player {
  id: string;
  name: string;
  color: string;
  money: number;
  position: number;
  jailed: number;
  bankrupt: boolean;
  passes: ("email" | "sms")[];
}
export interface Trade {
  id: string;
  from: string;
  to: string;
  give: number[];
  take: number[];
  giveMoney: number;
  takeMoney: number;
}
export interface Game {
  id: string;
  version: number;
  host: string;
  status: "lobby" | "playing" | "finished";
  players: Player[];
  properties: Record<number, Property>;
  turn: number;
  phase: "roll" | "buy" | "end";
  doubles: number;
  extra: boolean;
  dice: [number, number];
  debt: { amount: number; creditor: string | null } | null;
  trades: Trade[];
  decks: { email: number[]; sms: number[] };
  log: string[];
  duration: number;
  endsAt: number | null;
  turnAt: number;
  winner: string[];
  motion: { serial: number; player: string; path: number[] } | null;
  lastCard: string | null;
}
export type Action =
  | {
      type:
        | "start"
        | "roll"
        | "buy"
        | "decline"
        | "end"
        | "settle"
        | "bankrupt"
        | "pass";
    }
  | {
      type: "build" | "sell" | "mortgage" | "redeem" | "return";
      square: number;
    }
  | { type: "color"; color: string }
  | {
      type: "trade";
      to: string;
      give: number[];
      take: number[];
      giveMoney: number;
      takeMoney: number;
    }
  | { type: "accept" | "reject"; trade: string }
  | { type: "skip" | "expel" };
export interface Context {
  now: number;
  dice: [number, number];
  shuffled: { email: number[]; sms: number[] };
  inactive?: boolean;
}
export const COLORS = [
  "#d84b38",
  "#2779bd",
  "#dfa51b",
  "#8a56aa",
  "#218a65",
  "#d3508c",
];
````

## lib/http.ts

````typescript
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { HttpError } from "./store";
export async function body(req: Request): Promise<unknown> {
  const text = await req.text();
  if (text.length > 16000)
    throw new HttpError(413, "Solicitud demasiado grande.");
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "JSON inválido.");
  }
}
export async function respond(fn: () => Promise<unknown>) {
  try {
    return NextResponse.json(await fn(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    const status =
      e instanceof HttpError ? e.status : e instanceof ZodError ? 400 : 500;
    const message =
      e instanceof HttpError
        ? e.message
        : e instanceof ZodError
          ? "Revisa los datos enviados."
          : "No pudimos conectar con Redis. Intenta nuevamente.";
    if (status === 500)
      console.error(
        "Redis request failed",
        e instanceof Error ? e.name : "unknown",
      );
    return NextResponse.json(
      { error: message },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  }
}
````

## lib/store.ts

````typescript
import { Redis } from "@upstash/redis";
import { createHash, randomInt, randomUUID } from "node:crypto";
import { z } from "zod";
import { CARDS } from "./game/cards";
import {
  addLog,
  engine,
  finishByTime,
  newGame,
  newPlayer,
} from "./game/engine";
import { COLORS, type Action, type Context, type Game } from "./game/types";
interface Stored {
  game: Game;
  tokens: Record<string, string>;
  receipts: Record<string, number>;
}
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
function redis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token)
    throw new HttpError(
      503,
      "Configura las variables de Upstash Redis para jugar.",
    );
  return new Redis({ url, token });
}
const key = (id: string) => `turista:room:${id}`;
const digest = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export const roomId = z
  .string()
  .regex(/^[A-HJ-NP-Z2-9]{6}$/, "ID de sala inválido.");
export const identity = z.object({
  name: z.string().trim().min(1).max(24),
  color: z.enum(COLORS as [string, ...string[]]).optional(),
});
const square = z.number().int().min(0).max(39);
export const actionSchema: z.ZodType<Action> = z.discriminatedUnion("type", [
  z.object({
    type: z.enum([
      "start",
      "roll",
      "buy",
      "decline",
      "end",
      "settle",
      "bankrupt",
      "pass",
      "skip",
      "expel",
    ]),
  }),
  z.object({
    type: z.enum(["build", "sell", "mortgage", "redeem", "return"]),
    square,
  }),
  z.object({
    type: z.literal("color"),
    color: z.enum(COLORS as [string, ...string[]]),
  }),
  z.object({
    type: z.literal("trade"),
    to: z.string().uuid(),
    give: z.array(square).max(28),
    take: z.array(square).max(28),
    giveMoney: z.number().int().nonnegative().max(100000000),
    takeMoney: z.number().int().nonnegative().max(100000000),
  }),
  z.object({ type: z.literal("accept"), trade: z.string().max(100) }),
  z.object({ type: z.literal("reject"), trade: z.string().max(100) }),
]);
const CAS = `local old=redis.call('GET',KEYS[1]); if not old then return -1 end; local parsed=cjson.decode(old); if parsed.game.version~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',86400); return 1`;
async function save(id: string, old: number, value: Stored) {
  const result = await redis().eval<number>(
    CAS,
    [key(id)],
    [old, JSON.stringify(value)],
  );
  if (result === -1) throw new HttpError(404, "Sala no encontrada.");
  if (result !== 1)
    throw new HttpError(
      409,
      "La sala cambió. Actualiza el estado antes de intentar otra vez.",
    );
}
async function read(id: string): Promise<Stored> {
  roomId.parse(id);
  const stored = await redis().get<Stored>(key(id));
  if (!stored) throw new HttpError(404, "Sala no encontrada.");
  return stored;
}
function authorize(stored: Stored, token: string) {
  const id = stored.tokens[digest(token)];
  if (!id) throw new HttpError(401, "El token no pertenece a esta sala.");
  return id;
}
export function publicGame(s: Game): Game {
  return { ...s, decks: { email: [], sms: [] } };
}
function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function context(): Context {
  return {
    now: Date.now(),
    dice: [randomInt(1, 7), randomInt(1, 7)],
    shuffled: {
      email: shuffled(CARDS.email.length),
      sms: shuffled(CARDS.sms.length),
    },
  };
}
export async function createRoom(input: unknown) {
  const data = identity
    .extend({
      duration: z
        .union([z.literal(0), z.literal(30), z.literal(60), z.literal(90)])
        .default(0),
    })
    .parse(input);
  const token = randomUUID(),
    player = newPlayer(randomUUID(), data.name, data.color ?? COLORS[0]);
  for (let attempt = 0; attempt < 8; attempt++) {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const id = Array.from(
      { length: 6 },
      () => alphabet[randomInt(alphabet.length)],
    ).join("");
    const game = newGame(id, player, data.duration);
    const stored: Stored = {
      game,
      tokens: { [digest(token)]: player.id },
      receipts: {},
    };
    if (await redis().set(key(id), stored, { nx: true, ex: 86400 }))
      return {
        id,
        playerToken: token,
        playerId: player.id,
        game: publicGame(game),
      };
  }
  throw new HttpError(503, "No se pudo crear una sala. Intenta otra vez.");
}
export async function joinRoom(id: string, input: unknown) {
  const data = identity
    .extend({ token: z.string().uuid().optional() })
    .parse(input);
  const token = randomUUID();
  for (let i = 0; i < 4; i++) {
    const stored = await read(id);
    if (data.token) {
      const existing = stored.tokens[digest(data.token)];
      if (!existing)
        throw new HttpError(401, "El token no pertenece a esta sala.");
      return {
        playerToken: data.token,
        playerId: existing,
        game: publicGame(stored.game),
      };
    }
    const s = stored.game;
    if (s.status !== "lobby")
      throw new HttpError(409, "La partida ya comenzó.");
    if (s.players.length >= 6) throw new HttpError(409, "La sala está llena.");
    const color =
      data.color ?? COLORS.find((c) => !s.players.some((p) => p.color === c));
    if (!color || s.players.some((p) => p.color === color))
      throw new HttpError(409, "Este color ya está ocupado.");
    const p = newPlayer(randomUUID(), data.name, color);
    s.players.push(p);
    stored.tokens[digest(token)] = p.id;
    const old = s.version;
    s.version++;
    addLog(s, `${p.name} se unió al viaje.`);
    try {
      await save(id, old, stored);
      return { playerToken: token, playerId: p.id, game: publicGame(s) };
    } catch (e) {
      if (!(e instanceof HttpError) || e.status !== 409 || i === 3) throw e;
    }
  }
  throw new HttpError(409, "Intenta unirte nuevamente.");
}
export async function getRoom(
  id: string,
  token: string | null,
  heartbeat: boolean,
) {
  let stored = await read(id);
  let playerId: string | null = null;
  if (token) {
    playerId = authorize(stored, token);
    if (heartbeat)
      await redis().set(`turista:seen:${id}:${playerId}`, Date.now(), {
        ex: 86400,
      });
  }
  const expired = finishByTime(stored.game, Date.now());
  if (expired !== stored.game) {
    const old = stored.game.version;
    expired.version = old + 1;
    stored.game = expired;
    try {
      await save(id, old, stored);
    } catch (e) {
      if (!(e instanceof HttpError) || e.status !== 409) throw e;
      stored = await read(id);
    }
  }
  const active = stored.game.players[stored.game.turn];
  const seen = await redis().get<number>(`turista:seen:${id}:${active.id}`);
  return {
    game: publicGame(stored.game),
    playerId,
    inactiveFor: Math.max(
      0,
      Date.now() - Math.max(stored.game.turnAt, seen ?? 0),
    ),
  };
}
export async function act(id: string, input: unknown) {
  const data = z
    .object({
      token: z.string().uuid(),
      action: actionSchema,
      version: z.number().int().positive(),
      requestId: z.string().uuid(),
    })
    .parse(input);
  const stored = await read(id),
    pid = authorize(stored, data.token);
  const receipt = `${pid}:${data.requestId}`;
  if (stored.receipts[receipt]) return { game: publicGame(stored.game) };
  if (stored.game.version !== data.version)
    throw new HttpError(409, "La sala cambió. Revisa el estado actualizado.");
  const ctx = context();
  if (data.action.type === "skip" || data.action.type === "expel") {
    const active = stored.game.players[stored.game.turn];
    const seen = await redis().get<number>(`turista:seen:${id}:${active.id}`);
    ctx.inactive = ctx.now - Math.max(stored.game.turnAt, seen ?? 0) >= 90000;
  }
  let next: Game;
  try {
    next = engine(stored.game, data.action, pid, ctx);
  } catch (e) {
    throw new HttpError(
      400,
      e instanceof Error ? e.message : "Acción inválida.",
    );
  }
  next.version = stored.game.version + 1;
  const old = stored.game.version;
  stored.game = next;
  stored.receipts[receipt] = next.version;
  stored.receipts = Object.fromEntries(
    Object.entries(stored.receipts).slice(-100),
  );
  await save(id, old, stored);
  await redis().set(`turista:seen:${id}:${pid}`, ctx.now, { ex: 86400 });
  return { game: publicGame(next) };
}
````

## tests/api-smoke.mjs

````javascript
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
async function post(path, payload) {
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { status: response.status, data: await response.json() };
}
const created = await post("/api/rooms", { name: "Prueba Ana", duration: 30 });
assert.equal(created.status, 200, JSON.stringify(created.data));
const a = created.data,
  id = a.id;
const joined = await post(`/api/rooms/${id}/join`, { name: "Prueba Luis" });
assert.equal(joined.status, 200, JSON.stringify(joined.data));
const b = joined.data;
const action = (token, version, action, requestId = randomUUID()) =>
  post(`/api/rooms/${id}/action`, { token, version, action, requestId });
const wrong = await action(randomUUID(), b.game.version, { type: "start" });
assert.equal(wrong.status, 401);
const requestId = randomUUID();
const start = await action(
  a.playerToken,
  b.game.version,
  { type: "start" },
  requestId,
);
assert.equal(start.status, 200, JSON.stringify(start.data));
const replay = await action(
  a.playerToken,
  b.game.version,
  { type: "start" },
  requestId,
);
assert.equal(replay.data.game.version, start.data.game.version);
const pair = await Promise.all([
  action(a.playerToken, start.data.game.version, { type: "roll" }),
  action(a.playerToken, start.data.game.version, { type: "roll" }),
]);
assert.deepEqual(pair.map((x) => x.status).sort(), [200, 409]);
const snapshot = await fetch(`${base}/api/rooms/${id}`, {
  headers: { Authorization: `Bearer ${a.playerToken}` },
}).then((r) => r.json());
assert.equal(snapshot.playerId, a.playerId);
assert.equal(snapshot.game.players.length, 2);
assert.equal(JSON.stringify(snapshot).includes(a.playerToken), false);
assert.deepEqual(snapshot.game.decks, { email: [], sms: [] });
const unchanged = await fetch(
  `${base}/api/rooms/${id}?since=${snapshot.game.version}`,
).then((r) => r.json());
assert.equal(unchanged.changed, false);
console.log(
  `API y concurrencia verificadas en sala ${id}. La sala de prueba expira en 24 horas.`,
);
````

## tests/engine.test.ts

````typescript
import { describe, expect, it } from "vitest";
import { engine, finishByTime, newGame, newPlayer } from "../lib/game/engine";
import { BOARD } from "../lib/game/board";
import { CARDS } from "../lib/game/cards";
import { assetError, rent } from "../lib/game/rules";
import type { Action, Context, Game } from "../lib/game/types";
const ctx: Context = {
  now: 1000,
  dice: [1, 2],
  shuffled: {
    email: CARDS.email.map((_, i) => i),
    sms: CARDS.sms.map((_, i) => i),
  },
};
function game() {
  const s = newGame("ABC234", newPlayer("a", "Ana", "#a00"), 0);
  s.players.push(newPlayer("b", "Luis", "#00a"));
  return engine(s, { type: "start" }, "a", ctx);
}
const go = (s: Game, a: Action, dice: [number, number] = [1, 2], who = "a") =>
  engine(s, a, who, { ...ctx, dice });
describe("Tablero y motor", () => {
  it("tiene 40 casillas y mazos de 16 cartas", () => {
    expect(BOARD).toHaveLength(40);
    expect(CARDS.email).toHaveLength(16);
    expect(CARDS.sms).toHaveLength(16);
  });
  it("cobra al pasar y al caer en México sin mutar el estado", () => {
    const s = game();
    s.players[0].position = 38;
    const a = go(s, { type: "roll" }, [1, 2]);
    expect(a.players[0].money).toBe(1700);
    expect(a.players[0].position).toBe(1);
    expect(s.players[0].position).toBe(38);
    expect(go(s, { type: "roll" }, [1, 1]).players[0].money).toBe(1700);
  });
  it("dobla renta de grupo completo y respeta hipoteca", () => {
    const s = game();
    s.properties[1].owner = "a";
    s.properties[3].owner = "a";
    expect(rent(s, 1, 7)).toBe(4);
    s.properties[1].mortgaged = true;
    expect(rent(s, 1, 7)).toBe(0);
  });
  it("construye parejo hasta hotel y vende en orden inverso", () => {
    let s = game();
    s.players[0].money = 10000;
    for (const id of [6, 8, 9]) s.properties[id].owner = "a";
    s = go(s, { type: "build", square: 6 });
    expect(() => go(s, { type: "build", square: 6 })).toThrow(
      /menos edificios/,
    );
    for (const id of [8, 9]) s = go(s, { type: "build", square: id });
    for (let level = 2; level <= 5; level++)
      for (const id of [6, 8, 9]) s = go(s, { type: "build", square: id });
    expect(s.properties[6].buildings).toBe(5);
    expect(s.players[0].money).toBe(9250);
    s = go(s, { type: "sell", square: 6 });
    expect(s.properties[6].buildings).toBe(4);
    expect(s.players[0].money).toBe(9275);
    expect(() => go(s, { type: "sell", square: 6 })).toThrow(/más edificios/);
  });
  it("impide construir con hipotecas o grupo incompleto", () => {
    const s = game();
    s.properties[1].owner = "a";
    expect(assetError(s, s.players[0], 1, "build")).toMatch(/grupo/);
    s.properties[3].owner = "a";
    s.properties[3].mortgaged = true;
    expect(() => go(s, { type: "build", square: 1 })).toThrow(/hipotecas/);
  });
  it("hipoteca y libera con 10% de interés", () => {
    let s = game();
    s.properties[1].owner = "a";
    s = go(s, { type: "mortgage", square: 1 });
    expect(s.players[0].money).toBe(1530);
    s = go(s, { type: "redeem", square: 1 });
    expect(s.players[0].money).toBe(1497);
    expect(s.properties[1].mortgaged).toBe(false);
  });
  it("no hipoteca un grupo con edificios ni paga dos veces al devolver", () => {
    let s = game();
    s.properties[1].owner = "a";
    s.properties[3].owner = "a";
    s.properties[3].buildings = 1;
    expect(() => go(s, { type: "mortgage", square: 1 })).toThrow(/edificios/);
    s.properties[3].buildings = 0;
    s = go(s, { type: "mortgage", square: 1 });
    s = go(s, { type: "return", square: 1 });
    expect(s.players[0].money).toBe(1530);
    expect(s.properties[1].owner).toBeNull();
  });
  it("Oceanía al caer: pierde tres turnos y dobles permiten salir", () => {
    let s = game();
    s.players[0].position = 7;
    s = go(s, { type: "roll" });
    expect(s.players[0].jailed).toBe(3);
    for (let i = 2; i >= 0; i--) {
      s.phase = "roll";
      s = go(s, { type: "roll" });
      expect(s.players[0].jailed).toBe(i);
      expect(s.players[0].position).toBe(10);
    }
    s.phase = "roll";
    s = go(s, { type: "roll" }, [1, 2]);
    expect(s.players[0].position).toBe(13);
    s.players[0].jailed = 3;
    s.players[0].position = 10;
    s.phase = "roll";
    s = go(s, { type: "roll" }, [2, 2]);
    expect(s.players[0].jailed).toBe(0);
    expect(s.players[0].position).toBe(14);
    expect(s.extra).toBe(false);
  });
  it("tercer doble manda a Oceanía sin cobrar salida", () => {
    let s = game();
    s.doubles = 2;
    s.players[0].position = 39;
    s = go(s, { type: "roll" }, [2, 2]);
    expect(s.players[0].position).toBe(10);
    expect(s.players[0].money).toBe(1500);
    expect(s.extra).toBe(false);
  });
  it("permite turno extra solamente tras dobles", () => {
    let s = game();
    s = go(s, { type: "roll" }, [3, 3]);
    s = go(s, { type: "decline" });
    s = go(s, { type: "end" });
    expect(s.turn).toBe(0);
    expect(s.phase).toBe("roll");
    s = go(s, { type: "roll" }, [1, 2]);
    s = go(s, { type: "decline" });
    s = go(s, { type: "end" });
    expect(s.turn).toBe(1);
  });
  it("no permite comprar dos veces ni tirar fuera de turno", () => {
    let s = game();
    s = go(s, { type: "roll" });
    s = go(s, { type: "buy" });
    expect(() => go(s, { type: "buy" })).toThrow();
    expect(() => go(s, { type: "roll" }, [1, 2], "b")).toThrow(/turno/);
  });
  it("cobra aerolíneas y servicios con factores exactos", () => {
    const s = game();
    s.properties[5].owner = "b";
    s.properties[15].owner = "b";
    expect(rent(s, 5, 7)).toBe(50);
    s.properties[12].owner = "b";
    expect(rent(s, 12, 7)).toBe(28);
    s.properties[28].owner = "b";
    expect(rent(s, 12, 7)).toBe(70);
  });
  it("deuda bloquea turno y se paga al acreedor tras liquidar", () => {
    let s = game();
    s.players[0].money = 1;
    s.properties[3].owner = "b";
    s.properties[1].owner = "a";
    s = go(s, { type: "roll" });
    expect(s.debt?.amount).toBe(4);
    expect(() => go(s, { type: "end" })).toThrow(/deuda/);
    s = go(s, { type: "mortgage", square: 1 });
    s = go(s, { type: "settle" });
    expect(s.players[0].money).toBe(27);
    expect(s.players[1].money).toBe(1504);
    expect(s.debt).toBeNull();
  });
  it("quiebra exige liquidar, transfiere propiedades y termina partida", () => {
    let s = game();
    s.players[0].money = 0;
    s.properties[39].owner = "b";
    s.properties[39].buildings = 5;
    s.properties[1].owner = "a";
    s.players[0].position = 36;
    s = go(s, { type: "roll" });
    expect(() => go(s, { type: "bankrupt" })).toThrow(/Primero/);
    s = go(s, { type: "mortgage", square: 1 });
    s = go(s, { type: "bankrupt" });
    expect(s.properties[1].owner).toBe("b");
    expect(s.properties[1].mortgaged).toBe(true);
    expect(s.players[1].money).toBe(1530);
    expect(s.status).toBe("finished");
    expect(s.winner).toEqual(["b"]);
  });
  it("quiebra al Banco libera propiedades y no se permite si es solvente", () => {
    let s = game();
    s.players[0].money = 0;
    s.properties[1].owner = "a";
    s.debt = { amount: 10, creditor: null };
    expect(() => go(s, { type: "bankrupt" })).toThrow(/cubrir/);
    s.debt.amount = 200;
    s = go(s, { type: "mortgage", square: 1 });
    s = go(s, { type: "bankrupt" });
    expect(s.properties[1]).toEqual({
      owner: null,
      buildings: 0,
      mortgaged: false,
    });
  });
  it("tratos revalidan fondos y conservan hipotecas", () => {
    let s = game();
    s.properties[1].owner = "a";
    s.properties[1].mortgaged = true;
    s = go(s, {
      type: "trade",
      to: "b",
      give: [1],
      take: [],
      giveMoney: 0,
      takeMoney: 100,
    });
    const id = s.trades[0].id;
    s = go(s, { type: "accept", trade: id }, [1, 2], "b");
    expect(s.properties[1].owner).toBe("b");
    expect(s.properties[1].mortgaged).toBe(true);
    expect(s.players[0].money).toBe(1600);
    expect(s.players[1].money).toBe(1400);
    expect(() => go(s, { type: "accept", trade: id }, [1, 2], "b")).toThrow();
  });
  it("carta de salida se retira y vuelve al mazo al usarla", () => {
    let s = game();
    s.decks.email = [4, ...s.decks.email.filter((i) => i !== 4)];
    s = go(s, { type: "roll" }, [1, 1]);
    expect(s.players[0].passes).toEqual(["email"]);
    expect(s.decks.email).not.toContain(4);
    s.players[0].jailed = 3;
    s.phase = "roll";
    s = go(s, { type: "pass" });
    expect(s.players[0].jailed).toBe(0);
    expect(s.decks.email.at(-1)).toBe(4);
  });
  it("cartas de reparación distinguen hoteles de restaurantes", () => {
    let s = game();
    s.properties[1] = { owner: "a", buildings: 5, mortgaged: false };
    s.properties[3] = { owner: "a", buildings: 4, mortgaged: false };
    s.decks.email = [5, ...s.decks.email.filter((i) => i !== 5)];
    s = go(s, { type: "roll" }, [1, 1]);
    expect(s.players[0].money).toBe(1300);
  });
  it("modo por tiempo admite empate y descuenta hipotecas", () => {
    const s = game();
    s.endsAt = 2000;
    expect(finishByTime(s, 1999)).toBe(s);
    expect(finishByTime(s, 2000).winner).toEqual(["a", "b"]);
    s.properties[1].owner = "a";
    s.properties[1].mortgaged = true;
    expect(finishByTime(s, 2000).winner).toEqual(["a"]);
  });
  it("host solo salta por inactividad validada", () => {
    const s = game();
    expect(() => go(s, { type: "skip" })).toThrow(/90/);
    expect(
      engine(s, { type: "skip" }, "a", { ...ctx, inactive: true }).turn,
    ).toBe(1);
  });
});

it("completa una partida de dos jugadores sin estados de bloqueo", () => {
  let s = game();
  let seed = 1234567;
  const dice = (): [number, number] => {
    const one = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return (seed % 6) + 1;
    };
    return [one(), one()];
  };
  for (let step = 0; step < 15000 && s.status === "playing"; step++) {
    const p = s.players[s.turn];
    let action: Action;
    const owned = BOARD.filter((b) => s.properties[b.id]?.owner === p.id);
    if (s.debt) {
      if (p.money >= s.debt.amount) action = { type: "settle" };
      else {
        const sell = owned.find((b) => !assetError(s, p, b.id, "sell"));
        const mortgage = owned.find((b) => !assetError(s, p, b.id, "mortgage"));
        action = sell
          ? { type: "sell", square: sell.id }
          : mortgage
            ? { type: "mortgage", square: mortgage.id }
            : { type: "bankrupt" };
      }
    } else if (s.phase === "roll") action = { type: "roll" };
    else if (s.phase === "buy")
      action = { type: p.money >= BOARD[p.position].price ? "buy" : "decline" };
    else {
      const build = owned.find(
        (b) => p.money > 300 && !assetError(s, p, b.id, "build"),
      );
      action = build ? { type: "build", square: build.id } : { type: "end" };
    }
    s = engine(s, action, p.id, { ...ctx, now: 1000 + step, dice: dice() });
    expect(s.players.every((p) => p.money >= 0)).toBe(true);
  }
  expect(s.status).toBe("finished");
  expect(s.winner).toHaveLength(1);
});

it("el anfitrión quebrado conserva la moderación de jugadores desconectados", () => {
  const s = game();
  s.players.push(newPlayer("c", "Sol", "#0a0"));
  s.players[0].bankrupt = true;
  s.turn = 1;
  const next = engine(s, { type: "skip" }, "a", { ...ctx, inactive: true });
  expect(next.turn).toBe(2);
  expect(() => engine(s, { type: "roll" }, "a", ctx)).toThrow(
    /Jugador no disponible/,
  );
});
````

## tests/store.test.ts

````typescript
import { beforeEach, describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
// Test double only: production state is exclusively in Redis.
const memory = vi.hoisted(() => new Map<string, string>());
vi.mock("@upstash/redis", () => ({
  Redis: class {
    async get(key: string) {
      const raw = memory.get(key);
      return raw ? JSON.parse(raw) : null;
    }
    async set(key: string, value: unknown, options?: { nx?: boolean }) {
      if (options?.nx && memory.has(key)) return null;
      memory.set(key, JSON.stringify(value));
      return "OK";
    }
    async eval(_script: string, keys: string[], args: unknown[]) {
      const raw = memory.get(keys[0]);
      if (!raw) return -1;
      const stored = JSON.parse(raw);
      if (stored.game.version !== args[0]) return 0;
      memory.set(keys[0], String(args[1]));
      return 1;
    }
  },
}));
import { act, createRoom, getRoom, joinRoom } from "../lib/store";
import type { Action } from "../lib/game/types";
async function setup() {
  const a = await createRoom({ name: "Ana" });
  const b = await joinRoom(a.id, { name: "Luis" });
  return { a, b };
}
const request = (
  token: string,
  version: number,
  action: Action,
  requestId = randomUUID(),
) => ({ token, version, action, requestId });
beforeEach(() => {
  memory.clear();
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.test");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
});
describe("Persistencia autoritativa (adaptador Redis simulado)", () => {
  it("emite tokens únicos, recupera identidad y no filtra secretos ni mazos", async () => {
    const { a, b } = await setup();
    expect(a.playerToken).not.toBe(b.playerToken);
    const view = await getRoom(a.id, a.playerToken, true);
    expect(view.playerId).toBe(a.playerId);
    expect(JSON.stringify(view)).not.toContain(a.playerToken);
    const started = await act(
      a.id,
      request(a.playerToken, b.game.version, { type: "start" }),
    );
    expect(started.game.decks).toEqual({ email: [], sms: [] });
    const stored = JSON.parse(memory.get(`turista:room:${a.id}`)!);
    expect(stored.game.decks.email).toHaveLength(16);
    expect(JSON.stringify(stored)).not.toContain(a.playerToken);
  });
  it("rechaza token falsificado y no confía en un playerId", async () => {
    const { a, b } = await setup();
    await expect(
      act(a.id, {
        ...request(randomUUID(), b.game.version, { type: "start" }),
        playerId: a.playerId,
      }),
    ).rejects.toMatchObject({ status: 401 });
    await expect(
      act(a.id, request(b.playerToken, b.game.version, { type: "start" })),
    ).rejects.toMatchObject({ status: 400 });
  });
  it("dos acciones simultáneas con la misma versión tienen un solo ganador", async () => {
    const { a, b } = await setup();
    const start = await act(
      a.id,
      request(a.playerToken, b.game.version, { type: "start" }),
    );
    const results = await Promise.allSettled([
      act(a.id, request(a.playerToken, start.game.version, { type: "roll" })),
      act(a.id, request(a.playerToken, start.game.version, { type: "roll" })),
    ]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    const failure = results.find((r) => r.status === "rejected");
    expect(failure?.status === "rejected" && failure.reason.status).toBe(409);
    const final = await getRoom(a.id, a.playerToken, false);
    expect(final.game.version).toBe(start.game.version + 1);
  });
  it("repetir el mismo requestId no repite el efecto", async () => {
    const { a, b } = await setup();
    const req = request(a.playerToken, b.game.version, { type: "start" });
    const first = await act(a.id, req);
    const second = await act(a.id, req);
    expect(second.game).toEqual(first.game);
  });
  it("uniones concurrentes conservan colores y jugadores distintos", async () => {
    const a = await createRoom({ name: "Ana" });
    const joined = await Promise.all([
      joinRoom(a.id, { name: "Luis" }),
      joinRoom(a.id, { name: "Sol" }),
    ]);
    expect(joined).toHaveLength(2);
    const view = await getRoom(a.id, null, false);
    expect(view.game.players).toHaveLength(3);
    expect(new Set(view.game.players.map((p) => p.color)).size).toBe(3);
  });
  it("reconecta el token existente sin agregar otro jugador", async () => {
    const { a, b } = await setup();
    const again = await joinRoom(a.id, {
      name: "Otra Ana",
      token: a.playerToken,
    });
    expect(again.playerId).toBe(a.playerId);
    expect(again.game.players).toHaveLength(b.game.players.length);
  });
  it("impide entrar después del inicio y devuelve sala no encontrada", async () => {
    const { a, b } = await setup();
    await act(a.id, request(a.playerToken, b.game.version, { type: "start" }));
    await expect(joinRoom(a.id, { name: "Tercero" })).rejects.toMatchObject({
      status: 409,
    });
    await expect(getRoom("ZZZZZZ", null, false)).rejects.toMatchObject({
      status: 404,
    });
  });
  it("finaliza la partida vencida al consultarla sin temporizador residente", async () => {
    const a = await createRoom({ name: "Ana", duration: 30 });
    const b = await joinRoom(a.id, { name: "Luis" });
    await act(a.id, request(a.playerToken, b.game.version, { type: "start" }));
    const k = `turista:room:${a.id}`;
    const s = JSON.parse(memory.get(k)!);
    s.game.endsAt = Date.now() - 1;
    memory.set(k, JSON.stringify(s));
    const view = await getRoom(a.id, a.playerToken, false);
    expect(view.game.status).toBe("finished");
    expect(view.game.winner).toHaveLength(2);
  });
  it("valida cuerpos, montos, IDs y colores", async () => {
    await expect(createRoom({ name: " " })).rejects.toThrow();
    await expect(createRoom({ name: "Ana", duration: 12 })).rejects.toThrow();
    const { a, b } = await setup();
    await expect(
      act(
        a.id,
        request(a.playerToken, b.game.version, {
          type: "trade",
          to: b.playerId,
          give: [],
          take: [],
          giveMoney: -100,
          takeMoney: 0,
        }),
      ),
    ).rejects.toThrow();
  });
});

it("no acepta que un cliente elija un token nuevo al unirse", async () => {
  const a = await createRoom({ name: "Ana" });
  await expect(
    joinRoom(a.id, { name: "Luis", token: randomUUID() }),
  ).rejects.toMatchObject({ status: 401 });
  expect((await getRoom(a.id, null, false)).game.players).toHaveLength(1);
});
````

## scripts/entrega.mjs

````javascript
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const directories = ["app", "components", "lib", "tests", "scripts"];
const files = [
  ".env.example",
  ".gitignore",
  "package.json",
  "tsconfig.json",
  "next-env.d.ts",
  "next.config.ts",
  "tailwind.config.ts",
  "postcss.config.mjs",
  "eslint.config.mjs",
];
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.isFile()) files.push(file);
  }
}
for (const directory of directories) await walk(directory);
files.push("README.md");
const tree = {};
for (const file of files) {
  let branch = tree;
  for (const part of file.split("/")) branch = branch[part] ??= {};
}
function render(branch, prefix = "") {
  const entries = Object.entries(branch);
  return entries.flatMap(([name, children], i) => {
    const last = i === entries.length - 1;
    return [
      `${prefix}${last ? "└──" : "├──"} ${name}`,
      ...render(children, `${prefix}${last ? "    " : "│   "}`),
    ];
  });
}
let markdown =
  "```text\nturista-mundial/\n" + render(tree).join("\n") + "\n```\n";
for (const file of files) {
  const ext = path.extname(file);
  const lang =
    {
      ".ts": "typescript",
      ".tsx": "tsx",
      ".mjs": "javascript",
      ".json": "json",
      ".css": "css",
      ".md": "markdown",
    }[ext] ?? "text";
  markdown += `\n## ${file}\n\n\`\`\`\`${lang}\n${await readFile(file, "utf8")}\`\`\`\`\n`;
}
await writeFile("ENTREGA.md", markdown);
console.log(
  `ENTREGA.md: árbol y ${files.length} archivos completos; README al final.`,
);
````

## README.md

````markdown
# Turista Mundial

Juego multijugador en español de México con Next.js App Router, TypeScript estricto, Tailwind y Upstash Redis. Adaptación independiente; no es una edición oficial. Los 40 espacios y valores están centralizados en `lib/game/board.ts`, con aviso `// VERIFICAR`.

## Ejecutar localmente

1. Instala Node.js 22 o posterior.
2. Ejecuta `npm install`.
3. Copia `.env.example` a `.env.local`.
4. Crea una base Redis en Upstash y copia su REST URL y REST TOKEN en `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`. También se admiten `KV_REST_API_URL` y `KV_REST_API_TOKEN`. No uses prefijos `NEXT_PUBLIC_`.
5. Ejecuta `npm run dev` y abre `http://localhost:3000`.
6. Ejecuta `npm test`, `npm run lint` y `npm run build` para verificar el proyecto.

No existe una persistencia alternativa en memoria o archivos. Sin credenciales Redis válidas la interfaz explica la configuración pendiente; crear salas requiere Redis.

## Publicar en Vercel desde GitHub

1. Crea un repositorio vacío en GitHub.
2. Desde la carpeta del proyecto ejecuta:

```sh
git init
git add .
git commit -m "Implementa Turista Mundial multijugador"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/turista-mundial.git
git push -u origin main
```

3. En Vercel selecciona **Add New → Project**, importa el repositorio y conserva el preset Next.js, con la raíz del repositorio como directorio raíz.
4. En Marketplace busca **Upstash Redis**, crea o conecta una base y asígnala al proyecto. Comprueba que las variables de entorno tengan uno de los dos pares admitidos. Si la integración usa otro prefijo, copia manualmente REST URL y REST TOKEN en los nombres indicados arriba.
5. Activa las variables para Production y, si vas a probar previews, también Preview y Development.
6. Ejecuta Deploy. Si agregaste variables después de un despliegue, usa Redeploy.
7. Abre la URL HTTPS, crea una sala y copia su enlace para compartirlo.

Alternativa por CLI: ejecuta `npx vercel`, enlaza el proyecto, configura las mismas variables en su panel y ejecuta `npx vercel --prod`. No requiere servidor separado, procesos persistentes, WebSockets ni dependencias nativas.

## Probar con amigos

- Abre el sitio en dos navegadores o en una ventana normal y otra privada. Cada perfil representa a un jugador distinto.
- Crea una sala, copia su ID de seis caracteres o el enlace `/sala/ABC234` y únete desde el otro navegador.
- Elige colores distintos en el lobby. El anfitrión inicia con 2–6 participantes.
- Tira, compra o declina, y termina el turno. Los dobles conceden otro tiro; el tercer doble envía a Oceanía.
- Refresca: el token en localStorage permite volver al mismo jugador. No borres los datos del sitio; el token es la llave privada de tu asiento y no debe compartirse.
- Prueba dos acciones a la vez: una operación que utiliza una versión desactualizada recibe HTTP 409 y debe revisarse con el estado actualizado.
- Cierra la pestaña del jugador activo. Tras 90 segundos sin heartbeat o acción, el anfitrión puede saltarlo o declararlo en quiebra; no se puede saltar una deuda pendiente.
- Reúne grupos, construye de forma pareja, intercambia bienes y continúa hasta que quede un jugador. También puedes crear una sala de 30, 60 o 90 minutos.

## Reglas y decisiones de esta adaptación

Cada jugador comienza con $1,500; el Banco no tiene límite. Los billetes solicitados en el enunciado sumarían $1,500: se presenta únicamente el saldo. Pasar o caer en México paga $200, excepto el traslado directo a Oceanía. Caer en la propia casilla Oceanía también detiene al jugador, conforme a las reglas solicitadas; no existe “solo de visita”. Una tirada fallida consume uno de tres turnos detenidos; luego se tira normalmente en el siguiente turno. Salir con dobles desde Oceanía no concede un tiro adicional.

No hay subastas. La renta de un país sin edificios se duplica al poseer todas las propiedades del color. La hipoteca anula la renta únicamente de la propiedad hipotecada. Aerolíneas y servicios cuentan todas las propiedades del tipo que posee el dueño, incluidas las hipotecadas. Los servicios usan la tirada del turno, también al llegar por carta.

Construir requiere poseer todas las propiedades del grupo y que ninguna esté hipotecada. Las construcciones se compran y venden de forma pareja, exclusivamente al Banco. Un hotel es el nivel cinco: al venderlo se recupera medio costo de una construcción y queda con cuatro restaurantes. No se impone inventario físico limitado de edificios. Para hipotecar, devolver o intercambiar una propiedad deben haberse vendido todos los edificios de su grupo. Devolver una propiedad hipotecada no paga nuevamente la mitad del precio: ese dinero ya se recibió en la hipoteca. Deshipotecar cuesta el principal más 10%, redondeado al peso superior.

La gestión de propiedades y las propuestas de trato se hacen durante el turno propio; el destinatario puede aceptar o rechazar durante ese turno. Terminar el turno cancela las propuestas. Las propiedades hipotecadas se pueden intercambiar conservando su hipoteca. Los tratos se revalidan al aceptar y no se permiten durante una deuda. No se cobra interés adicional por transferir una hipoteca; liberarla posteriormente sí cobra 10%.

Si falta efectivo, la deuda se conserva íntegra sin pagos parciales. El jugador vende edificios y puede hipotecar o devolver bienes. Solo se admite quiebra cuando sus activos realizables no cubren la deuda y ya no quedan edificios ni propiedades sin hipotecar. El acreedor recibe el efectivo y propiedades restantes con sus hipotecas; si es el Banco, las propiedades quedan libres. Las cartas de salida vuelven a su mazo.

El patrimonio para modo por tiempo suma efectivo, valor original de propiedades y costo original de edificios, menos el principal de hipotecas y deudas pendientes. Los empates comparten victoria. El vencimiento se calcula con hora del servidor y se materializa en la siguiente consulta o acción; no necesita cron. El anfitrión no se reasigna automáticamente.

## Pruebas automatizadas

`npm test` ejecuta 32 pruebas: reglas del motor, una partida completa simulada hasta quiebra, autenticación, reconexión, idempotencia y carreras de escritura. Las pruebas del almacén utilizan un doble de Redis exclusivamente dentro del archivo de prueba; la aplicación nunca usa ese estado simulado.

Con el sitio ejecutándose y Redis configurado, ejecuta `npm run test:api`. Para probar un despliegue usa `TEST_BASE_URL=https://TU_PROYECTO.vercel.app npm run test:api`. Crea una sala real de prueba y verifica tokens, dos jugadores, reconexión, polling sin cambios, idempotencia y dos tiradas concurrentes. La sala de prueba expira por TTL; la prueba no borra salas existentes.

## Estado de validación de esta entrega

- 32 pruebas Vitest ejecutadas y aprobadas usando paquetes disponibles en la caché local.
- Motor comprobado con TypeScript estricto; revisión adicional de código con reglas recomendadas de TypeScript ESLint aprobada.
- `npm run build` y la configuración completa de ESLint de Next.js no pudieron verificarse en este entorno: el acceso al registro npm falla por resolución DNS, y Next.js, su configuración de ESLint y el SDK de Upstash no están disponibles en la caché. No se afirma que el build haya pasado.
- No se ha ejecutado la prueba contra Redis real ni una partida en dos navegadores. No se han proporcionado credenciales Upstash ni publicado un despliegue.
- Ejecuta instalación, pruebas, lint, build y `test:api` con las variables reales antes de publicar.

## Arquitectura y seguridad

- `lib/game/engine.ts`: reducer puro, sin reloj, red ni aleatoriedad propios. Recibe dados, mazos y hora mediante contexto del servidor. Devuelve una copia o lanza un error sin mutar la entrada.
- `lib/game/rules.ts`: rentas, grupos, validación de activos y patrimonio.
- `lib/game/board.ts` y `cards.ts`: tablero y 16 cartas por mazo.
- `lib/store.ts`: Redis REST, tokens, creación y unión, control de versiones, expiración y presencia.
- `app/api/rooms/**`: Route Handlers dinámicos con runtime Node.js y respuestas sin caché.
- `components/Room.tsx`: polling secuencial aproximadamente cada segundo, pausa al ocultarse la pestaña, heartbeat cada 20 segundos y reconexión automática.

Redis conserva cada sala durante 24 horas desde su última creación, unión o acción guardada. Los tokens UUID se almacenan como hashes SHA-256 y nunca aparecen en el estado público. No se acepta un playerId del cliente como autenticación. La secuencia de mazos también se excluye de las respuestas. Los dados y barajados usan `node:crypto` en el servidor.

Cada escritura compara y cambia la versión dentro de un único script Lua atómico en Redis. Si otra solicitud ganó la carrera, se rechaza la escritura; no hay ventana de expiración de lock que permita una escritura tardía. El endpoint de acciones además acepta un `requestId` UUID y recuerda los últimos 100 recibos para evitar reejecuciones de solicitudes ya guardadas. La interfaz no reintenta automáticamente una acción cuando desconoce su resultado; el polling recupera el estado confirmado.

Las lecturas usan `GET /api/rooms/[id]?since=<version>` y devuelven `{changed:false}` cuando no cambió la sala. El token se transmite en Authorization para recuperar identidad y presencia. Los espectadores con el ID pueden leer el tablero pero no actuar. Los estados de presencia se guardan por separado en Redis y no incrementan la versión del juego.

El polling consume solicitudes Redis incluso sin cambios: dimensiona la cuota según jugadores y duración. Este proyecto no incluye un servicio antispam de terceros ni recuperación de tokens perdidos. Usa HTTPS y comparte enlaces únicamente con los participantes deseados.

## Referencias

- [Upstash Redis TypeScript SDK](https://upstash.com/docs/redis/sdks/ts/getstarted)
- [Redis EVAL](https://redis.io/docs/latest/commands/eval/)
- [Next.js Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)

La versión mínima de Next.js es 15.5.29, conforme al [aviso oficial de seguridad del 3 de noviembre de 2026](https://nextjs.org/blog/november-2026-security-release).
````

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
  action(a.playerToken, start.data.game.version, { type: "opening-roll" }),
  action(a.playerToken, start.data.game.version, { type: "opening-roll" }),
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

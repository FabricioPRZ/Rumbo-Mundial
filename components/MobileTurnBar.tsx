"use client";

import { BOARD, cash, DEPORTATION_FINE } from "@/lib/game/board";
import type { Action, Game, Player } from "@/lib/game/types";

export default function MobileTurnBar({ game, me, busy, send, onOptions, animating = false, position }: {
  game: Game;
  me: Player;
  busy: boolean;
  send: (action: Action) => void;
  onOptions: () => void;
  animating?: boolean;
  position?: number;
}) {
  const active = game.players[game.turn];
  const mine = active.id === me.id;
  let message = `Espera el turno de ${active.name}.`;
  let label = "Tirar los dados";
  let action: Action | null = null;
  let showOptions = false;

  if (me.bankrupt) {
    message = "Terminó tu viaje. Puedes seguir viendo la partida.";
  } else if (game.opening) {
    label = "Tirar dado de salida";
    if (!game.opening.candidates.includes(me.id)) {
      message = "Espera el desempate de los finalistas.";
    } else if (game.opening.rolls[me.id] !== undefined) {
      message = `Sacaste ${game.opening.rolls[me.id]}. Esperando a los demás.`;
    } else {
      message = "Tira para decidir quién empieza.";
      action = { type: "opening-roll" };
    }
  } else if (game.auction) {
    const passed = game.auction.passed.includes(me.id);
    message = passed ? "Ya rechazaste la subasta. Esperando a los demás." : "Subasta en curso. Puedes revisar las ofertas.";
    label = passed ? "Subasta en curso" : "Ver subasta";
    showOptions = !passed;
  } else if (game.debt) {
    const payer = game.debt.payer ?? active.id;
    if (payer === me.id) {
      message = `Pago pendiente: ${cash(game.debt.amount)}.`;
      if (me.money >= game.debt.amount) {
        label = "Seleccionar billetes";
        action = { type: "settle" };
      } else {
        label = "Administrar bienes";
        showOptions = true;
      }
    } else {
      message = `Esperando el pago de ${game.players.find((p) => p.id === payer)?.name}.`;
    }
  } else if (game.choice) {
    message = "Hay una elección pendiente antes de continuar.";
    if (game.choice.player === me.id) {
      label = "Elegir viajero";
      showOptions = true;
    }
  } else if (mine && me.jailed > 0 && me.detention === "oceania") {
    message = `Deportado: paga ${cash(DEPORTATION_FINE)} y vuelve a Salida sin sueldo, o espera. Quedan ${me.jailed} turnos.`;
    label = game.detentionDecision === me.id ? "Quedarme · 3 turnos" : game.phase === "roll" ? "Cumplir un turno de espera" : "Cambio automático";
    action = game.detentionDecision === me.id ? { type: "stay" } : game.phase === "roll" ? { type: "wait" } : null;
  } else if (mine && game.phase === "roll") {
    if (me.jailed || me.skipTurns) {
      message = `${me.jailed ? me.detention === "prison" ? "Cárcel" : "Deportado" : "Estancia por carta"}: ${me.jailed || me.skipTurns} turnos pendientes.`;
      label = "Cumplir turno de espera";
      action = { type: "wait" };
    } else {
      message = "Es tu turno. ¡Tira los dados!";
      action = { type: "roll" };
    }
  } else if (mine && game.phase === "buy") {
    message = `Puedes comprar ${BOARD[me.position].name}.`;
    label = "Decidir compra";
    showOptions = true;
  } else if (mine && game.phase === "end") {
    message = game.extra ? "Sacaste dobles. Tu siguiente tiro se habilitará automáticamente." : "Tu turno termina automáticamente al completar la jugada.";
    label = "Cambio automático";
  }

  const deported = mine && !me.bankrupt && me.jailed > 0 && me.detention === "oceania" &&
    !game.opening && !game.auction && !game.debt && !game.choice;

  return (
    <section className={`mobile-turn-bar ${mine && !me.bankrupt ? "is-my-turn" : ""}`} aria-label="Tu turno y acciones">
      <div className="mobile-turn-info">
        <strong><i className="player-dot" style={{ background: me.color }} />{me.name} · {cash(me.money)}</strong>
        <span>{BOARD[position ?? me.position].name}</span>
        <p role="status">{animating ? "El viaje está en curso…" : message}</p>
      </div>
      <div className="mobile-turn-actions">
        {deported && <>
          <button disabled={busy || me.money < DEPORTATION_FINE} onClick={() => send({ type: "bail" })}>Pagar multa · {cash(DEPORTATION_FINE)}</button>
          {me.money < DEPORTATION_FINE && <small>Saldo insuficiente para la multa.</small>}
        </>}
        {!me.bankrupt && (
          <button
            className="primary"
            disabled={busy || (!action && !showOptions)}
            title={!action && !showOptions ? message : undefined}
            onClick={() => action ? send(action) : onOptions()}
          >
            {animating ? "Viajando…" : busy ? "Procesando…" : label}
          </button>
        )}
      </div>
    </section>
  );
}

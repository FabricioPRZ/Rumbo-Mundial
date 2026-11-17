import { expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import EntryForm from "../src/presentation/organisms/EntryForm";
import PaymentModal from "../src/presentation/organisms/PaymentModal";
import TradeModal from "../src/presentation/organisms/TradeModal";
import { game } from "./helpers";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
const commit = async () => true;
const close = () => {};

it("conserva un envío explícito por formulario al reutilizar Button", () => {
  const state = game();
  const forms = [
    <EntryForm key="entry" />,
    <PaymentModal key="payment" player={state.players[0]} amount={5000} label="Pago" action={{ type: "settle" }} onClose={close} commit={commit} />,
    <TradeModal key="trade" game={state} me={state.players[0]} onClose={close} send={commit} />,
  ];
  for (const form of forms) {
    const html = renderToStaticMarkup(form);
    const buttons = html.match(/<button\b[^>]*>/g) ?? [];
    expect(buttons.filter((button) => button.includes('type="submit"'))).toHaveLength(1);
    expect(buttons.every((button) => /type="(button|submit)"/.test(button))).toBe(true);
  }
});

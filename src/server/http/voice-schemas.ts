import { z } from "zod";
const session = z.string().uuid();
export const voiceCommand = z.discriminatedUnion("type", [
  z.object({ type: z.literal("join"), session, muted: z.boolean() }),
  z.object({ type: z.literal("heartbeat"), session, muted: z.boolean() }),
  z.object({ type: z.literal("leave"), session }),
  z.object({ type: z.literal("signal"), session, to: session, toSession: session, connection: session,
    description: z.object({ type: z.enum(["offer", "answer"]), sdp: z.string().min(10).max(12000)
      .refine((value) => value.startsWith("v=0") && /(?:^|\r?\n)m=audio /.test(value) && !/(?:^|\r?\n)m=(?:video|application) /.test(value), "Solo audio.") }),
  }),
]);


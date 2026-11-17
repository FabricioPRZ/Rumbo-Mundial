import type { IceServer } from "@/domain/voice/types";
export function iceServers(): IceServer[] {
  const servers: IceServer[] = [{ urls: "stun:stun.cloudflare.com:3478" }];
  const urls = (process.env.VOICE_TURN_URLS ?? "").split(",").map((url) => url.trim()).filter((url) => /^turns?:[^\s]+$/.test(url));
  if (urls.length && process.env.VOICE_TURN_USERNAME && process.env.VOICE_TURN_CREDENTIAL) {
    servers.push({ urls, username: process.env.VOICE_TURN_USERNAME, credential: process.env.VOICE_TURN_CREDENTIAL });
  }
  return servers;
}


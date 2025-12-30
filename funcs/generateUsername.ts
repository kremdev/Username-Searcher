import type { Platforms as Platform } from "../types/types";

export async function generateUsername(
  length: number,
  platform: Platform
): Promise<string> {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const rules = {
    discord: {
      extra: "_.",
      noRepeat: [".."],
      noEnd: ["_", "."],
    },
    instagram: {
      extra: "_",
      noRepeat: ["__"],
      noEnd: ["_"],
    },
    x: {
      extra: "_",
      startLetter: true,
      max: 15,
    },
    github: {
      extra: "-",
      startLetter: true,
      noRepeat: ["--"],
      noEnd: ["-"],
      max: 39,
    },
    twitch: {},
    youtube: {},
    snapchat: {},
  } as const;

  const rule = rules[platform] ?? {};
  const maxLen = rule.max ?? length;
  const finalLength = Math.min(length, maxLen);

  let chars = letters + numbers + (rule.extra ?? "");
  let out = rule.startLetter
    ? letters[Math.floor(Math.random() * letters.length)]
    : "";

  while (out.length < finalLength) {
    const next = chars[Math.floor(Math.random() * chars.length)];
    const test = out + next;

    if (rule.noRepeat?.some((r) => test.endsWith(r))) continue;
    if (rule.noEnd?.includes(next) && out.length === finalLength - 1) continue;

    out += next;
  }

  return /^\d+$/.test(out) ? generateUsername(length, platform) : out;
}

import { appendFileSync } from "node:fs";
import { join } from "node:path";
import { Platforms } from "../types/types";

export async function writeFile(username: string, platform: Platforms) {
  const filePath = await join(__dirname, "..", "usernames", `${platform}.txt`);
  await appendFileSync(filePath, `${username}\n`, { encoding: "utf-8" });
}

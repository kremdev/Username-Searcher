import type { Req, Platforms } from "../types/types";
import { byAPI } from "../tools/byAPI";
import { byPlaywright } from "../tools/byPlaywright";
import { byStatus } from "../tools/byStatus";

export async function Search(
  reqParams: Req,
  platform: Platforms
): Promise<void> {
  switch (platform) {
    case "youtube":
    case "github":
    case "snapchat":
      await byStatus(reqParams, platform);
      break;
    case "gunslol":
    case "tiktok":
    case "instagram":
    case "twitch":
    case "x":
      await byPlaywright(reqParams, platform);
      break;
    case "discord":
      await byAPI(reqParams, platform);
      break;
    default:
      console.error(`❌ Unsupported platform: ${platform}`);
      break;
  }
}

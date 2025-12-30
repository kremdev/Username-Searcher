export interface Req {
  limit: number;
  chars: number;
  interval?: number;
}

export type Platforms =
  | "discord"
  | "github"
  | "instagram"
  | "twitch"
  | "youtube"
  | "snapchat"
  | "gunslol"
  | "tiktok"
  | "x";

export enum PlatformsList {
  Discord = "discord",
  Github = "github",
  Instagram = "instagram",
  Twitch = "twitch",
  Youtube = "youtube",
  Snapchat = "snapchat",
  GunsLol = "gunslol",
  Tiktok = "tiktok",
  X = "x",
}

// x, gunslol ,twitch ,instagram ,tiktok
// import { generateUsername, } from "@usernames-finder/index";

import axios from "axios";
import type { Platforms, Req } from "../types/types";
import { generateUsername } from "../funcs/generateUsername";
import { setTimeout as sleep } from "timers/promises";
import { writeFile } from "../funcs/writeFile";
import "dotenv/config";

const api = "https://discord.com/api/v9/users/@me/pomelo-attempt";
const token = process.env.userToken!;

async function isUsernameTaken(username: string): Promise<boolean | null> {
  try {
    const response = await axios.post(
      api,
      { username },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const res = response?.data;

    if (res && !res.taken) {
      return false;
    } else {
      return true;
    }
  } catch (error: any) {
    if (error.response?.status === 429) {
      const retryAfter = error.response.data?.retry_after || 1;
      console.log(`⚠️ Rate limited! Waiting ${retryAfter} seconds...`);
      await sleep(retryAfter * 1000);
      return await isUsernameTaken(username);
    }

    console.log(
      `⚠️ Error checking "${username}":`,
      error.response?.data || error.message
    );
    return null;
  }
}

export async function byAPI(reqParams: Req, platform: Platforms) {
  console.clear();

  const { chars, limit } = reqParams;

  for (let i = 0; i < limit; i++) {
    const username = await generateUsername(chars, platform);
    const taken = await isUsernameTaken(username);

    if (taken === true) {
      console.log(`❌ Taken: ${username}`);
    } else if (taken === false) {
      await writeFile(username, platform);
      console.log(`✅ Available: ${username}`);
    }
    await sleep(500);
  }
}

import axios from "axios";
import type { Platforms, Req } from "../types/types";
import { generateUsername } from "../funcs/generateUsername";
import { writeFile } from "../funcs/writeFile";

export async function byStatus(reqParams: Req, platform: Platforms) {
  console.clear();

  const { chars, limit } = reqParams;

  for (let i = 0; i < limit; i++) {
    const username = await generateUsername(chars, platform);

    const url = `https://${platform}.com/${
      platform === "snapchat" ? `@${username}` : username
    }`;

    try {
      const res = await axios.get(url);

      if (res.status === 200) {
        console.log(`❌ Taken: ${username}`);
      }
    } catch (error) {
      await writeFile(username, platform);
      console.log(`✅ Available: ${username}`);
    }
  }
}

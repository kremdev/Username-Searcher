import { chromium } from "playwright";
import { Platforms, Req } from "../types/types";
import { setTimeout as sleep } from "timers/promises";
import { generateUsername } from "../funcs/generateUsername";
import { writeFile } from "../funcs/writeFile";

export async function byPlaywright(reqParams: Req, platform: Platforms) {
  console.clear();
  const { chars, limit } = reqParams;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  });

  for (let i = 0; i < limit; i++) {
    let username = await generateUsername(chars, platform);
    let url: string;

    switch (platform) {
      case "x":
        url = `https://x.com/${username}`;
        break;
      case "gunslol":
        url = `https://guns.lol/${username}`;
        break;
      case "twitch":
        url = `https://www.twitch.tv/${username}`;
        break;
      case "instagram":
        url = `https://www.instagram.com/${username}`;
        break;
      case "tiktok":
        url = `https://www.tiktok.com/@${username}`;
        break;
      default:
        console.log(`❌ Platform ${platform} not supported`);
        continue;
    }

    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);

      let isAvailable = false;

      switch (platform) {
        case "x":
          isAvailable = !!(await page.$(
            'span:has-text("This account doesn’t exist")'
          ));
          break;
        case "gunslol":
          isAvailable =
            !!(await page.$('h1:has-text("Username not found")')) ||
            !!(await page.$(
              'h3:has-text("Claim this username by clicking on the button below!")'
            ));
          break;
        case "twitch":
          isAvailable = !!(await page.$(
            'p[data-a-target="core-error-message"]:has-text("Sorry. Unless you\'ve got a time machine, that content is unavailable")'
          ));
          break;
        case "instagram":
          isAvailable = !!(await page.$(
            'span:has-text("Profile isn\'t available")'
          ));
          break;
        case "tiktok":
          isAvailable = !!(await page.$(
            'p:has-text("Couldn\'t find this account")'
          ));
          break;
      }

      if (isAvailable) {
        await writeFile(username, platform);
        console.log(`✅ Available ${username} on ${platform}`);
      } else {
        console.log(`❌ Taken ${username} on ${platform}`);
      }
    } catch (err: any) {
      console.log(
        `⚠️ Error checking ${username} on ${platform}: ${err.message}`
      );
    }

    await sleep(800);
  }

  await browser.close();
}

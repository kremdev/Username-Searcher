import inquirer from "inquirer";
import chalk from "chalk";
import { textSync } from "figlet";
import { PlatformsList } from "../types/types";
import { setTimeout as sleep } from "timers/promises";
import { Search } from "../funcs/search";

console.clear();
const text = textSync("Usernames Searcher");
console.log(chalk.blue.bold(text));

inquirer
  .prompt([
    {
      type: "rawlist",
      name: "platform",
      message: chalk.yellow("Choose a platform:"),
      choices: Object.keys(PlatformsList),
    },
    {
      type: "input",
      name: "limit",
      message: chalk.yellow("Enter limit (1–500):"),
      validate: (input) => {
        const value = Number(input);
        if (Number.isNaN(value)) return chalk.red("❌ Limit must be a number");
        if (value < 1 || value > 500)
          return chalk.red("❌ Limit must be between 1 and 500");
        return true;
      },
      filter: Number,
    },
    {
      type: "input",
      name: "chars",
      message: chalk.yellow("Enter characters count (3–10):"),
      validate: (input) => {
        const value = Number(input);
        if (Number.isNaN(value))
          return chalk.red("❌ Characters count must be a number");
        if (value < 3 || value > 10)
          return chalk.red("❌ Characters count must be between 3 and 10");
        return true;
      },
      filter: Number,
    },
  ])
  .then(async (answers) => {
    const { chars, limit, platform } = answers;

    const selectedPlatform =
      PlatformsList[platform as keyof typeof PlatformsList];

    console.log(
      chalk.green.bold(
        `\n✅ Starting search on ${selectedPlatform.toUpperCase()}`
      )
    );
    console.log(chalk.cyan(`Characters: ${chars} | Limit: ${limit}\n`));
    await sleep(2000);
    await Search({ chars, limit }, selectedPlatform);
  });

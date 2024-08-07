#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import * as fs from "fs";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createDirectoryContents from "./createDirectoryContents.js";
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const colors = {
  gold: "#FFD700",
  crimson: "#DC143C",
};
let projectName;
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
];
async function end() {
  console.log(chalk.greenBright("🎉 Project created successfully!"));
  console.log(
    chalk.greenBright("🚀 Run the following command to start your project:")
  );
  console.log(chalk.cyanBright("cd " + projectName));
  console.log(chalk.cyanBright("npm install"));
  console.log(chalk.cyanBright("npm run dev"));
}

const useGradient = (opt) => {
  const titleColor = opt.colors ?? Object.values(colors);
  const title = gradient(titleColor)(opt.title ?? "");
  console.log(title);
};

async function askProjectName() {
  await inquirer.prompt(QUESTIONS).then((answers) => {
    const projectChoice = answers["project-choice"];
    projectName = answers["project-name"];
    const templatePath = `${__dirname}/templates/${projectChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);
  });

  await end();
}
async function welcome() {
  const figletConfig = {
    font: "Big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  };

  useGradient({
    title: figlet.textSync("NestJS Templates", figletConfig),
  });

  await sleep();
}

await welcome();
await askProjectName();

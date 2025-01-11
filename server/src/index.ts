import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { nodeBasePrompt } from "./defaults/node";
import { reactBasePrompt } from "./defaults/react";

import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { DEFAULT_PROMPT, getSystemPrompt } from "./prompts";
import { TextBlock } from "@anthropic-ai/sdk/resources";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const app = express();
app.use(express.json());
app.post("/template", async (req, res) => {
  const { prompt } = req.body;
  console.log(reactBasePrompt);
  const response = await anthropic.messages.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 100,
    system:
      "Return either node or react based on what do you think this project should be.Only return a single word 'node' or 'react'.Do not return any thing extra",
  });
  const answer = (response.content[0] as TextBlock).text;

  if (answer === "react") {
    res.json({
      prompts: [
        //to be transfered to the llm
        DEFAULT_PROMPT,
        `# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n${reactBasePrompt} Here is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n  - .bolt/prompt`,
      ],
      uiPrompts: [reactBasePrompt], //to create the ui
    });
    return;
  }

  if (answer === "node") {
    res.json({
      prompts: [
        "# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n${reactBasePrompt} Here is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n  - .bolt/prompt",
      ],
      uiPrompts: [nodeBasePrompt],
    });
    return;
  }

  res.status(403).json({ message: "You cant access this" });
  return;
});

app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  const response = await anthropic.messages
    .stream({
      messages: messages,
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8000,
      system: getSystemPrompt(),
    })
    .on("text", (text) => {
      console.log(text);
    });

  console.log(response);
  res.json({});
});

app.listen(3000);
// async function main() {
//   await anthropic.messages
//     .stream({
//       messages: [
//         {
//           role: "user",
//           content:
//             "",
//         },
//         {
//           role: "user",
//           content:
//             `\n\n\n`,
//         },

//         {
//           role: "user",
//           content:
//             "<bolt_running_commands>\n</bolt_running_commands>\n\ncreate a todo app\n\n# File Changes\n\nHere is a list of all files that have been modified since the start of the conversation.\nThis information serves as the true contents of these files!\n\nThe contents include either the full file contents or a diff (when changes are smaller and localized).\n\nUse it to:\n - Understand the latest file modifications\n - Ensure your suggestions build upon the most recent version of the files\n - Make informed decisions about changes\n - Ensure suggestions are compatible with existing code\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - /home/project/.bolt/config.json",
//         },
//       ],
//       model: "claude-3-5-sonnet-20241022",
//       max_tokens: 2048,
//       system: getSystemPrompt(),
//     })
//     .on("text", (text) => {
//       console.log(text);
//     });
// }

// main();

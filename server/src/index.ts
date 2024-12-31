import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "./prompts";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function main() {
  await anthropic.messages
    .stream({
      messages: [
        {
          role: "user",
          content:
            "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.",
        },
        {
          role: "user",
          content:
            `# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n\n\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n  - .bolt/prompt`,
        },

        {
          role: "user",
          content:
            "<bolt_running_commands>\n</bolt_running_commands>\n\ncreate a todo app\n\n# File Changes\n\nHere is a list of all files that have been modified since the start of the conversation.\nThis information serves as the true contents of these files!\n\nThe contents include either the full file contents or a diff (when changes are smaller and localized).\n\nUse it to:\n - Understand the latest file modifications\n - Ensure your suggestions build upon the most recent version of the files\n - Make informed decisions about changes\n - Ensure suggestions are compatible with existing code\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - /home/project/.bolt/config.json",
        },
      ],
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2048,
      system: getSystemPrompt(),
    })
    .on("text", (text) => {
      console.log(text);
    });
}

main();



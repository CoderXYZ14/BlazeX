import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function main() {
  await anthropic.messages
    .stream({
      messages: [{ role: "user", content: "What is adjective" }],
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
    })
    .on("text", (text) => {
      console.log(text);
    });
}

main();

import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { reactBasePrompt } from "../utils/defaults/react";
import { nodeBasePrompt } from "../utils/defaults/node";
import { TextBlock } from "@anthropic-ai/sdk/resources";
import Anthropic from "@anthropic-ai/sdk";
import { DEFAULT_PROMPT, getSystemPrompt } from "../prompts";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const template = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new ApiError(400, "Prompt is required");
  }

  try {
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
        "Return either node or react based on what do you think this project should be. Only return a single word 'node' or 'react'. Do not return anything extra.",
    });

    const answer = (response.content[0] as TextBlock).text;

    if (answer === "react") {
      return res.status(200).json(
        new ApiResponse(200, {
          prompts: [
            DEFAULT_PROMPT,
            `# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n
            ${reactBasePrompt} 
            Here is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n  - .bolt/prompt`,
          ],
          uiPrompts: [reactBasePrompt],
        })
      );
    }

    if (answer === "node") {
      return res.status(200).json(
        new ApiResponse(200, {
          prompts: [
            `# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n${nodeBasePrompt} Here is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n  - .bolt/prompt`,
          ],
          uiPrompts: [nodeBasePrompt],
        })
      );
    }

    throw new ApiError(403, "You can't access this");
  } catch (error) {
    if (error instanceof ApiError)
      throw new ApiError(error.statusCode, error.message);

    throw new ApiError(
      500,
      (error as Error).message ||
        "An unexpected error occurred during processing"
    );
  }
});

const chat = asyncHandler(async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    throw new ApiError(400, "Messages are required and must be an array.");
  }

  try {
    let streamedText = "";

    const response = await anthropic.messages.create({
      messages: messages,
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8000,
      system: getSystemPrompt(),
    });
    res
      .status(200)
      .json(
        new ApiResponse(200, {
          response: (response.content[0] as TextBlock)?.text,
        })
      );
  } catch (error) {
    if (error instanceof ApiError) {
      throw new ApiError(error.statusCode, error.message);
    }

    throw new ApiError(
      500,
      (error as Error).message ||
        "An unexpected error occurred during processing."
    );
  }
});
export { template, chat };

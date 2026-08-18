import { streamText } from "ai";
import { AI_MODEL, getGateway } from "./ai-gateway.server";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export async function runPrompt(opts: {
  system: string;
  prompt?: string;
  messages?: ChatMessage[];
}): Promise<{ text: string }> {
  const gateway = getGateway();
  try {
    const result = streamText({
      model: gateway(AI_MODEL),
      system: opts.system,
      ...(opts.messages
        ? { messages: opts.messages }
        : { prompt: opts.prompt ?? "" }),
    });
    const text = await result.text;
    return { text };
  } catch (error: unknown) {
    const status = (error as { statusCode?: number; status?: number })?.statusCode ??
      (error as { status?: number })?.status;
    if (status === 429) {
      throw new Error("Too many requests right now. Please wait a moment and try again.");
    }
    if (status === 402) {
      throw new Error("AI credits are exhausted for this workspace. Add credits to continue.");
    }
    if (status === 403) {
      throw new Error("AI access is blocked for this workspace by an admin setting.");
    }
    throw new Error(
      error instanceof Error ? error.message : "The AI request failed. Please try again.",
    );
  }
}

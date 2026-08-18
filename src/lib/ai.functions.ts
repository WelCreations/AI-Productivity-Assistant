import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runPrompt } from "./ai-run.server";

const EmailInput = z.object({
  purpose: z.string().min(1),
  recipient: z.string().default(""),
  tone: z.string().default("formal"),
  length: z.string().default("medium"),
  keyPoints: z.string().default(""),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) =>
    runPrompt({
      system:
        "You are an expert business communication writer. You write clear, concise, professional emails. " +
        "Always return: a 'Subject:' line, then the email body, then a sign-off placeholder [Your Name]. " +
        "Never invent facts, figures, names or commitments that were not given: use [bracketed placeholders] instead. " +
        "Use plain markdown, no preamble and no explanation of your work.",
      prompt: [
        `Write an email.`,
        `Recipient / audience: ${data.recipient || "unspecified"}`,
        `Tone: ${data.tone}`,
        `Length: ${data.length}`,
        `Purpose: ${data.purpose}`,
        data.keyPoints ? `Key points that must appear:\n${data.keyPoints}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  );

const NotesInput = z.object({
  notes: z.string().min(1),
  meetingType: z.string().default("team meeting"),
});

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => NotesInput.parse(input))
  .handler(async ({ data }) =>
    runPrompt({
      system:
        "You are a meticulous meeting analyst. Summarise raw meeting notes into a structured markdown report with exactly these sections: " +
        "'## Summary' (3-5 bullets), '## Key Decisions', '## Action Items' (a markdown table with columns Owner | Action | Deadline), " +
        "'## Deadlines & Dates', '## Open Questions & Risks'. " +
        "Only use information present in the notes. If an owner or deadline is missing write 'Unassigned' or 'No date'. Never fabricate.",
      prompt: `Meeting type: ${data.meetingType}\n\nRaw notes:\n"""\n${data.notes}\n"""`,
    }),
  );

const PlannerInput = z.object({
  tasks: z.string().min(1),
  horizon: z.string().default("day"),
  hours: z.string().default("8"),
  workStyle: z.string().default("balanced"),
});

export const planSchedule = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => PlannerInput.parse(input))
  .handler(async ({ data }) =>
    runPrompt({
      system:
        "You are a productivity coach who builds realistic schedules using the Eisenhower matrix (urgent/important) and time-blocking. " +
        "Return markdown with: '## Priority Ranking' (table: Priority | Task | Why | Est. time), " +
        "'## Time-Blocked Schedule' (table: Time | Focus | Task), '## Deferred or Delegate', '## Focus Tips' (max 3 bullets). " +
        "Include realistic breaks. Never over-schedule beyond the available hours.",
      prompt: [
        `Planning horizon: ${data.horizon}`,
        `Available productive hours: ${data.hours}`,
        `Preferred work style: ${data.workStyle}`,
        `Tasks and constraints:\n${data.tasks}`,
      ].join("\n"),
    }),
  );

const ResearchInput = z.object({
  topic: z.string().min(1),
  depth: z.string().default("overview"),
  audience: z.string().default("business team"),
});

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ResearchInput.parse(input))
  .handler(async ({ data }) =>
    runPrompt({
      system:
        "You are a research analyst. Produce markdown with: '## Executive Summary', '## Key Concepts', '## Insights & Analysis', " +
        "'## Recommendations' (actionable, numbered), '## Risks & Counterpoints', '## Confidence & Limitations'. " +
        "You have no live web access: rely on general knowledge, say when something may be outdated, and never invent statistics, " +
        "citations or sources. Flag anything the reader should verify independently.",
      prompt: `Topic or pasted text to analyse:\n"""\n${data.topic}\n"""\n\nDepth: ${data.depth}\nAudience: ${data.audience}`,
    }),
  );

const ChatInput = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .min(1),
});

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) =>
    runPrompt({
      system:
        "You are Aster, a workplace productivity assistant. Be concise, practical and warm. Use markdown, short paragraphs and bullets. " +
        "Ask a clarifying question when the request is ambiguous. Decline unethical requests, never fabricate facts or figures, " +
        "and remind the user to verify anything consequential (legal, financial, HR or medical) with a qualified human.",
      messages: data.messages,
    }),
  );

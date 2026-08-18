# Aster AI — AI Productivity Assistant

One integrated AI-powered platform that automates the everyday workplace tasks that eat the most time: writing emails, summarising meetings, planning the day, researching topics and answering quick work questions.

## Project overview

Aster AI is a single dashboard application (not multiple projects) containing five AI-powered tools behind one sidebar navigation. Each tool wraps a carefully engineered system prompt around the Lovable AI gateway so results arrive **structured, editable and honest about their limitations**.

## Features

| Feature | What it does |
| --- | --- |
| Smart Email Generator | Professional emails with tone control (formal, friendly, persuasive, apologetic, assertive), audience, length and required key points. Uses `[placeholders]` instead of inventing facts. |
| Meeting Notes Summarizer | Converts raw notes/transcripts into Summary, Key Decisions, an Action Items table (Owner / Action / Deadline), Deadlines and Open Questions & Risks. |
| AI Task Planner | Eisenhower-matrix prioritisation plus time-blocking, constrained to the hours you actually have, with breaks and a deferred/delegate list. |
| AI Research Assistant | Executive summary, key concepts, insights, numbered recommendations, counterpoints and a required Confidence & Limitations section. |
| Workplace AI Chatbot | Conversational assistant ("Aster") that keeps the full conversation history for follow-ups. |

Cross-cutting:

- Modern dashboard layout with sidebar navigation (drawer on mobile)
- Fully responsive (mobile + desktop)
- Clear input and output sections for every tool
- **Editable AI outputs** — preview markdown or switch to edit, then copy or download
- Responsible AI disclaimer on the dashboard, in the sidebar, in the footer and next to every input

## Prompt engineering approach

Every feature uses a role-scoped system prompt with:

1. An explicit persona ("expert business communication writer", "meticulous meeting analyst", …)
2. A required output contract (exact markdown sections/tables) so results are consistently parseable
3. Grounding constraints — only use supplied information, mark unknowns as `Unassigned` / `No date` / `[placeholder]`
4. Anti-hallucination rules — no invented statistics, citations, names or commitments
5. User-supplied variables (tone, depth, audience, horizon, hours, work style) injected as labelled fields, not free text

## Responsible AI practices

- Visible disclaimers on the dashboard, sidebar, footer, every tool and the chatbot
- Prompts instruct the model to state confidence limits and flag items needing verification
- Users are warned not to submit confidential, personal or regulated data
- Outputs are editable by default — the human stays the author
- Gateway errors (rate limits, exhausted credits, blocked access) are surfaced in the UI instead of being hidden behind a fake answer

## Tools used

- **Lovable AI Gateway** (`google/gemini-2.5-flash`) via the **AI SDK** (`ai`, `@ai-sdk/openai-compatible`)
- **TanStack Start** (React 19, file-based routing, server functions) + **Vite**
- **Tailwind CSS v4** with an oklch design-token system (royal purple + ice floe + a warm gold accent)
- **shadcn/ui** + **lucide-react** + **react-markdown**
- **TypeScript**, **Zod** for input validation

## Architecture

```
src/
  lib/ai-gateway.server.ts   # Lovable AI gateway provider (server-only)
  lib/ai-run.server.ts       # Shared model call + error mapping
  lib/ai.functions.ts        # Typed server functions: email, notes, planner, research, chat
  components/app-shell.tsx   # Sidebar + responsive dashboard layout
  components/ai-tool-page.tsx# Reusable input/output tool screen
  components/ai-output.tsx   # Editable markdown output (preview / edit / copy / download)
  routes/                    # /, /email, /notes, /planner, /research, /chat
```

The API key never reaches the browser: all model calls run inside server functions.

## Setup instructions

```bash
bun install       # or npm install
bun run dev       # http://localhost:8080
bun run build     # production build
```

Environment: `LOVABLE_API_KEY` is provisioned automatically by Lovable and read server-side only.

## Team members

- Add your name(s) here.

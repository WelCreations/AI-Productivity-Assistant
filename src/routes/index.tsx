import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  CalendarClock,
  BookOpenCheck,
  MessagesSquare,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aster AI — Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "One dashboard with five AI tools: email generation, meeting summaries, task planning, research briefs and a workplace chatbot.",
      },
      { property: "og:title", content: "Aster AI — Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Automate everyday workplace tasks with five AI tools in a single, responsible-by-design dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    body: "Professional drafts in formal, friendly, persuasive or assertive tones — placeholders instead of invented facts.",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    body: "Turn a messy transcript into a summary, decisions, an owner/deadline action table and open risks.",
  },
  {
    to: "/planner",
    icon: CalendarClock,
    title: "AI Task Planner",
    body: "Eisenhower prioritisation plus time-blocking for a realistic daily or weekly schedule.",
  },
  {
    to: "/research",
    icon: BookOpenCheck,
    title: "AI Research Assistant",
    body: "Summaries, insights and recommendations with an explicit confidence and limitations section.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "Workplace Chatbot",
    body: "A conversational assistant that keeps full context for follow-up questions and quick drafting.",
  },
] as const;

function Dashboard() {
  return (
    <AppShell
      title="Dashboard"
      description="Five AI tools for the work that eats your day."
    >
      <div className="flex flex-col gap-6">
        <section
          className="overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-10"
          style={{ backgroundImage: "var(--gradient-royal)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            AI-powered productivity
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight sm:text-4xl">
            Automate the writing, summarising and planning. Keep the judgement.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-primary-foreground/85 sm:text-base">
            Aster AI wraps carefully engineered prompts around Lovable AI so every output arrives
            structured, editable and honest about what it doesn't know.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Draft an email <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
            >
              Talk to Aster
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TOOLS.map(({ to, icon: Icon, title, body }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-accent/50 bg-accent/15 p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-5 text-primary" /> Responsible AI disclaimer
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>
              • Every output is AI-generated and may be incomplete or wrong. Review and edit before
              sending, publishing or acting on it.
            </li>
            <li>
              • Aster has no live web access and does not produce citations or statistics on demand;
              verify facts, figures and dates independently.
            </li>
            <li>
              • Don't enter confidential, personal or regulated data. Prompts are sent to a
              third-party AI model for processing.
            </li>
            <li>
              • AI assists, humans decide. Legal, financial, medical and HR decisions need a
              qualified person in the loop.
            </li>
          </ul>
        </section>
      </div>
    </AppShell>
  );
}

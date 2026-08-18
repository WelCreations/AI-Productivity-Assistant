import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { SendHorizonal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatWithAssistant } from "@/lib/ai.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Workplace AI Chatbot | Aster AI" },
      {
        name: "description",
        content:
          "Chat with Aster, an AI workplace assistant for drafting, planning, decisions and day-to-day office questions.",
      },
      { property: "og:title", content: "Workplace AI Chatbot | Aster AI" },
      {
        property: "og:description",
        content: "An interactive AI assistant for everyday workplace tasks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Help me say no to a meeting request politely.",
  "Turn these three bullet points into an agenda.",
  "How do I structure a weekly status update?",
  "Give me a checklist for onboarding a new teammate.",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await chatWithAssistant({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "The assistant is unavailable right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      title="Workplace AI Chatbot"
      description="Ask Aster anything about your workday — full conversation context is kept."
    >
      <div className="mx-auto flex h-[calc(100vh-14rem)] min-h-[30rem] w-full max-w-3xl flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
              <div
                className="flex size-14 items-center justify-center rounded-2xl text-xl font-bold text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-royal)" }}
                aria-hidden
              >
                A
              </div>
              <div>
                <p className="font-semibold">Hi, I'm Aster.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your workplace assistant for drafting, planning and thinking out loud.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] text-sm",
                  m.role === "user"
                    ? "rounded-2xl bg-primary px-4 py-2.5 text-primary-foreground"
                    : "md-content text-foreground",
                )}
              >
                {m.role === "user" ? m.content : <ReactMarkdown>{m.content}</ReactMarkdown>}
              </div>
            </div>
          ))}

          {loading && (
            <p className="animate-pulse text-sm text-muted-foreground">Aster is thinking…</p>
          )}
          {error && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border p-3 sm:p-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={2}
              placeholder="Ask Aster… (Enter to send, Shift+Enter for a new line)"
              className="min-h-[3rem] resize-none"
            />
            <Button
              size="icon"
              className="size-11 shrink-0"
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <SendHorizonal className="size-4" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Aster can be wrong. Verify important details and avoid sharing confidential data.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

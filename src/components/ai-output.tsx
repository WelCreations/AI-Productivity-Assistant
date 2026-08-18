import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Check, Copy, Download, Eye, Pencil, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function AiOutput({
  value,
  onChange,
  loading,
  error,
  emptyHint,
  filename,
}: {
  value: string;
  onChange: (v: string) => void;
  loading: boolean;
  error: string | null;
  emptyHint: string;
  filename: string;
}) {
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const download = () => {
    const blob = new Blob([value], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="flex min-h-[26rem] flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">AI output — editable</h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode(mode === "preview" ? "edit" : "preview")}
            disabled={!value}
          >
            {mode === "preview" ? <Pencil className="size-4" /> : <Eye className="size-4" />}
            {mode === "preview" ? "Edit" : "Preview"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={!value}
            onClick={() => {
              navigator.clipboard.writeText(value);
              setCopied(true);
            }}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="ghost" size="sm" disabled={!value} onClick={download}>
            <Download className="size-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        {loading && (
          <div className="flex h-full min-h-[18rem] flex-col items-center justify-center gap-3 text-muted-foreground">
            <Sparkle className="size-6 animate-pulse text-primary" />
            <p className="animate-pulse text-sm">Drafting with Lovable AI…</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && !value && (
          <div className="flex h-full min-h-[18rem] items-center justify-center px-6 text-center text-sm text-muted-foreground">
            {emptyHint}
          </div>
        )}

        {!loading && !error && value && mode === "preview" && (
          <div className={cn("md-content text-sm text-foreground")}>
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        )}

        {!loading && !error && value && mode === "edit" && (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[22rem] resize-y font-mono text-xs"
          />
        )}
      </div>
    </section>
  );
}

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AiOutput } from "@/components/ai-output";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Field =
  | { name: string; label: string; type: "text" | "textarea"; placeholder?: string; rows?: number; hint?: string }
  | { name: string; label: string; type: "select"; options: { value: string; label: string }[] };

export function AiToolPage({
  title,
  description,
  fields,
  defaults,
  requiredField,
  submitLabel,
  emptyHint,
  filename,
  promptNote,
  run,
}: {
  title: string;
  description: string;
  fields: Field[];
  defaults: Record<string, string>;
  requiredField: string;
  submitLabel: string;
  emptyHint: string;
  filename: string;
  promptNote: string;
  run: (values: Record<string, string>) => Promise<{ text: string }>;
}) {
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (name: string, v: string) => setValues((p) => ({ ...p, [name]: v }));

  const submit = async () => {
    if (!values[requiredField]?.trim()) {
      setError("Please fill in the main input before generating.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await run(values);
      setOutput(res.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title={title} description={description}>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:p-6">
          <h2 className="text-sm font-semibold">Your input</h2>
          <p className="mt-1 text-xs text-muted-foreground">{promptNote}</p>

          <div className="mt-5 flex flex-col gap-4">
            {fields.map((f) => (
              <div key={f.name} className="flex flex-col gap-2">
                <Label htmlFor={f.name}>{f.label}</Label>
                {f.type === "textarea" && (
                  <Textarea
                    id={f.name}
                    rows={f.rows ?? 6}
                    placeholder={f.placeholder}
                    value={values[f.name] ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
                {f.type === "text" && (
                  <Input
                    id={f.name}
                    placeholder={f.placeholder}
                    value={values[f.name] ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
                {f.type === "select" && (
                  <Select value={values[f.name] ?? ""} onValueChange={(v) => set(f.name, v)}>
                    <SelectTrigger id={f.name}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {"hint" in f && f.hint && (
                  <p className="text-xs text-muted-foreground">{f.hint}</p>
                )}
              </div>
            ))}

            <Button onClick={submit} disabled={loading} size="lg" className="mt-1">
              <Wand2 className="size-4" />
              {loading ? "Generating…" : submitLabel}
            </Button>

            <p className="text-xs text-muted-foreground">
              Don't paste confidential client data, credentials or personal information.
            </p>
          </div>
        </section>

        <AiOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          error={error}
          emptyHint={emptyHint}
          filename={filename}
        />
      </div>
    </AppShell>
  );
}

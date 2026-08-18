import { createFileRoute } from "@tanstack/react-router";
import { AiToolPage } from "@/components/ai-tool-page";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Aster AI" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in formal, friendly or persuasive tones, then edit the AI output before sending.",
      },
      { property: "og:title", content: "Smart Email Generator | Aster AI" },
      {
        property: "og:description",
        content: "Generate tone-controlled professional emails with Lovable AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AiToolPage
      title="Smart Email Generator"
      description="Professional emails in the tone your situation needs."
      promptNote="Structured prompt: purpose + audience + tone + length + key points. Placeholders are used instead of invented facts."
      submitLabel="Generate email"
      requiredField="purpose"
      filename="email-draft.md"
      emptyHint="Describe what the email needs to achieve and your draft will appear here, ready to edit."
      defaults={{ purpose: "", recipient: "", tone: "formal", length: "medium", keyPoints: "" }}
      fields={[
        {
          name: "purpose",
          label: "What is this email about?",
          type: "textarea",
          rows: 5,
          placeholder: "e.g. Ask the vendor to extend the trial by two weeks while procurement finishes review.",
        },
        {
          name: "recipient",
          label: "Recipient / audience",
          type: "text",
          placeholder: "e.g. External vendor account manager",
        },
        {
          name: "tone",
          label: "Tone",
          type: "select",
          options: [
            { value: "formal", label: "Formal" },
            { value: "friendly", label: "Friendly" },
            { value: "persuasive", label: "Persuasive" },
            { value: "apologetic", label: "Apologetic" },
            { value: "assertive but polite", label: "Assertive but polite" },
          ],
        },
        {
          name: "length",
          label: "Length",
          type: "select",
          options: [
            { value: "short", label: "Short (under 80 words)" },
            { value: "medium", label: "Medium" },
            { value: "detailed", label: "Detailed" },
          ],
        },
        {
          name: "keyPoints",
          label: "Key points to include (optional)",
          type: "textarea",
          rows: 4,
          placeholder: "One point per line",
        },
      ]}
      run={(values) =>
        generateEmail({
          data: {
            purpose: values["purpose"] ?? "",
            recipient: values["recipient"] ?? "",
            tone: values["tone"] ?? "formal",
            length: values["length"] ?? "medium",
            keyPoints: values["keyPoints"] ?? "",
          },
        })
      }
    />
  );
}

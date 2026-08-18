import { createFileRoute } from "@tanstack/react-router";
import { AiToolPage } from "@/components/ai-tool-page";
import { summarizeNotes } from "@/lib/ai.functions";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | Aster AI" },
      {
        name: "description",
        content:
          "Turn messy meeting notes into a structured summary with decisions, owners, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | Aster AI" },
      {
        property: "og:description",
        content: "Extract decisions, action items and deadlines from raw meeting notes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AiToolPage
      title="Meeting Notes Summarizer"
      description="Decisions, owners, action items and deadlines — extracted in seconds."
      promptNote="Structured prompt: the model must only use what is in your notes and mark missing owners or dates instead of guessing."
      submitLabel="Summarize notes"
      requiredField="notes"
      filename="meeting-summary.md"
      emptyHint="Paste raw notes or a transcript and you'll get a summary, decisions, an action-item table and deadlines."
      defaults={{ notes: "", meetingType: "team meeting" }}
      fields={[
        {
          name: "notes",
          label: "Raw notes or transcript",
          type: "textarea",
          rows: 14,
          placeholder: "Paste everything — bullet fragments and typos are fine.",
        },
        {
          name: "meetingType",
          label: "Meeting type",
          type: "select",
          options: [
            { value: "team meeting", label: "Team meeting" },
            { value: "client call", label: "Client call" },
            { value: "project stand-up", label: "Project stand-up" },
            { value: "stakeholder review", label: "Stakeholder review" },
            { value: "interview", label: "Interview" },
          ],
        },
      ]}
      run={(values) =>
        summarizeNotes({
          data: {
            notes: values["notes"] ?? "",
            meetingType: values["meetingType"] ?? "team meeting",
          },
        })
      }
    />
  );
}

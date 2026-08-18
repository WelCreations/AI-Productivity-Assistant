import { createFileRoute } from "@tanstack/react-router";
import { AiToolPage } from "@/components/ai-tool-page";
import { researchTopic } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | Aster AI" },
      {
        name: "description",
        content:
          "Summarise topics or pasted articles into key concepts, insights, recommendations and clearly flagged limitations.",
      },
      { property: "og:title", content: "AI Research Assistant | Aster AI" },
      {
        property: "og:description",
        content: "Summaries, insights and recommendations with honest confidence limits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AiToolPage
      title="AI Research Assistant"
      description="Summaries, insights and recommendations — with limitations stated up front."
      promptNote="Structured prompt: no live web access, no invented statistics or citations, and a required confidence & limitations section."
      submitLabel="Analyse topic"
      requiredField="topic"
      filename="research-brief.md"
      emptyHint="Enter a topic or paste an article, and a structured research brief will appear here."
      defaults={{ topic: "", depth: "overview", audience: "business team" }}
      fields={[
        {
          name: "topic",
          label: "Topic or article text",
          type: "textarea",
          rows: 12,
          placeholder: "e.g. How should a 20-person agency adopt AI note-taking tools responsibly?",
        },
        {
          name: "depth",
          label: "Depth",
          type: "select",
          options: [
            { value: "overview", label: "Quick overview" },
            { value: "standard analysis", label: "Standard analysis" },
            { value: "deep dive", label: "Deep dive" },
          ],
        },
        {
          name: "audience",
          label: "Audience",
          type: "select",
          options: [
            { value: "business team", label: "Business team" },
            { value: "executive leadership", label: "Executive leadership" },
            { value: "technical team", label: "Technical team" },
            { value: "non-technical newcomers", label: "Non-technical newcomers" },
          ],
        },
      ]}
      run={(values) =>
        researchTopic({
          data: {
            topic: values["topic"] ?? "",
            depth: values["depth"] ?? "overview",
            audience: values["audience"] ?? "business team",
          },
        })
      }
    />
  );
}

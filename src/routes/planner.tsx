import { createFileRoute } from "@tanstack/react-router";
import { AiToolPage } from "@/components/ai-tool-page";
import { planSchedule } from "@/lib/ai.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | WorkSync AI" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritised, time-blocked daily or weekly schedule with realistic breaks.",
      },
      { property: "og:title", content: "AI Task Planner | WorkSync AI" },
      {
        property: "og:description",
        content: "Prioritise tasks and build a realistic time-blocked schedule.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <AiToolPage
      title="AI Task Planner"
      description="Prioritised, time-blocked plans that fit the hours you actually have."
      promptNote="Structured prompt: Eisenhower prioritisation plus time-blocking, constrained to your available hours."
      submitLabel="Build my schedule"
      requiredField="tasks"
      filename="schedule.md"
      emptyHint="List your tasks — with deadlines and rough durations if you know them — and your plan will appear here."
      defaults={{ tasks: "", horizon: "day", hours: "8", workStyle: "balanced" }}
      fields={[
        {
          name: "tasks",
          label: "Tasks, deadlines and constraints",
          type: "textarea",
          rows: 12,
          placeholder:
            "e.g.\nFinish Q3 report – due tomorrow – 3h\nClient call 11:00–11:30\nReview 4 pull requests\nGym, sometime after 17:00",
        },
        {
          name: "horizon",
          label: "Plan for",
          type: "select",
          options: [
            { value: "day", label: "Today" },
            { value: "week", label: "This week" },
          ],
        },
        {
          name: "hours",
          label: "Available productive hours",
          type: "select",
          options: [
            { value: "4", label: "4 hours" },
            { value: "6", label: "6 hours" },
            { value: "8", label: "8 hours" },
            { value: "10", label: "10 hours" },
          ],
        },
        {
          name: "workStyle",
          label: "Work style",
          type: "select",
          options: [
            { value: "balanced", label: "Balanced" },
            { value: "deep work first", label: "Deep work first" },
            { value: "quick wins first", label: "Quick wins first" },
            { value: "meeting-heavy day", label: "Meeting-heavy day" },
          ],
        },
      ]}
      run={(values) =>
        planSchedule({
          data: {
            tasks: values["tasks"] ?? "",
            horizon: values["horizon"] ?? "day",
            hours: values["hours"] ?? "8",
            workStyle: values["workStyle"] ?? "balanced",
          },
        })
      }
    />
  );
}

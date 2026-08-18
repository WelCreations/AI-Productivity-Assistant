import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  CalendarClock,
  BookOpenCheck,
  MessagesSquare,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/notes", label: "Notes Summarizer", icon: NotebookPen },
  { to: "/planner", label: "Task Planner", icon: CalendarClock },
  { to: "/research", label: "Research Assistant", icon: BookOpenCheck },
  { to: "/chat", label: "Workplace Chatbot", icon: MessagesSquare },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_0_var(--sidebar-primary)]"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 px-1 py-1">
      <div
        className="flex size-10 items-center justify-center rounded-xl text-lg font-bold text-primary-foreground"
        style={{ backgroundImage: "var(--gradient-royal)" }}
        aria-hidden
      >
        A
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-sidebar-foreground">WorkSync AI</p>
        <p className="text-xs text-sidebar-foreground/60">One AI workspace for your workday</p>
      </div>
    </div>
  );
}

function SidebarFooterNote() {
  return (
    <div className="mt-auto rounded-xl bg-sidebar-accent/50 p-3 text-xs text-sidebar-foreground/70">
      <p className="mb-1 flex items-center gap-1.5 font-semibold text-sidebar-foreground">
        <ShieldCheck className="size-3.5" /> Responsible AI
      </p>
      AI output can be inaccurate. Review and edit everything before you send or act on it.
    </div>
  );
}

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 bg-sidebar p-4 lg:flex">
        <Brand />
        <NavList />
        <SidebarFooterNote />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col gap-6 bg-sidebar p-4">
            <div className="flex items-center justify-between">
              <Brand />
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent"
                aria-label="Close navigation"
              >
                <X className="size-4" />
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
            <SidebarFooterNote />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg border border-border p-2 text-foreground lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-4" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">{title}</h1>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">{description}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>

        <footer className="border-t border-border/70 px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          WorkSync AI assists — it does not decide. Verify facts, figures and commitments before use.
        </footer>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { formatSrt } from "@/lib/generator";
import type { ShortPlan } from "@/lib/types";

interface DownloadPanelProps {
  plan: ShortPlan;
}

export function DownloadPanel({ plan }: DownloadPanelProps) {
  const [status, setStatus] = useState<string | null>(null);

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setStatus(`Downloaded ${filename}`);
    setTimeout(() => setStatus(null), 2000);
  };

  const jsonExport = JSON.stringify(plan, null, 2);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <header className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Exports</span>
          <h2 className="mt-1 text-2xl font-semibold text-white">Deliverables</h2>
        </div>
        {status ? <span className="text-xs text-agent-blue">{status}</span> : null}
      </header>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => handleDownload(plan.segments.map((segment) => `${segment.title}\n${segment.script}\n`).join("\n"), "short-script.txt")}
          className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-left transition hover:border-agent-blue/60 hover:bg-agent-blue/10"
        >
          <div className="text-sm font-semibold text-white">Script text</div>
          <p className="text-xs text-slate-400">Formatted beat-by-beat narration</p>
        </button>

        <button
          type="button"
          onClick={() => handleDownload(formatSrt(plan.captions), "captions.srt")}
          className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-left transition hover:border-agent-blue/60 hover:bg-agent-blue/10"
        >
          <div className="text-sm font-semibold text-white">Caption file</div>
          <p className="text-xs text-slate-400">Drop straight into CapCut or Premiere</p>
        </button>

        <button
          type="button"
          onClick={() => handleDownload(jsonExport, "short-plan.json")}
          className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-left transition hover:border-agent-blue/60 hover:bg-agent-blue/10"
        >
          <div className="text-sm font-semibold text-white">Automation JSON</div>
          <p className="text-xs text-slate-400">Use in scripts or editing macros</p>
        </button>

        <div className="rounded-2xl border border-agent-purple/40 bg-agent-purple/10 p-4 text-left">
          <div className="text-sm font-semibold text-agent-purple">Soundtrack pulls</div>
          <ul className="mt-2 space-y-1 text-xs text-slate-200">
            {plan.soundtrack.map((track) => (
              <li key={track.id} className="flex items-center justify-between gap-2">
                <span>{track.title}</span>
                <span className="text-slate-400">{track.platform}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/5 bg-slate-950/40 p-4">
        <div className="text-sm font-semibold text-white">SEO ready-to-post</div>
        <div className="mt-3 space-y-2 text-xs text-slate-300">
          <div>
            <span className="font-semibold text-slate-200">Title:</span> {plan.seo.title}
          </div>
          <div>
            <span className="font-semibold text-slate-200">Description:</span> {plan.seo.description}
          </div>
          <div>
            <span className="font-semibold text-slate-200">Tags:</span> {plan.seo.tags.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
}

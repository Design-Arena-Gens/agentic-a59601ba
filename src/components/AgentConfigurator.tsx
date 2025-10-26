"use client";

import { useMemo } from "react";
import { toneOptions, paceOptions } from "@/lib/defaults";
import type { AgentConfig } from "@/lib/types";

interface AgentConfiguratorProps {
  config: AgentConfig;
  onChange: (partial: Partial<AgentConfig>) => void;
  onGenerate: () => void;
  generating?: boolean;
  suggestions: string[];
}

export function AgentConfigurator({ config, onChange, onGenerate, generating = false, suggestions }: AgentConfiguratorProps) {
  const durations = useMemo(
    () => [30, 45, 60, 70],
    []
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-glow backdrop-blur-xl">
      <header className="mb-6 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Step 1</span>
        <h2 className="text-2xl font-semibold text-white">Brief the agent</h2>
        <p className="text-sm text-slate-400">Describe the short you need and hit generate. The agent crafts a ready-to-shoot package.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">Topic</span>
          <input
            value={config.topic}
            onChange={(event) => onChange({ topic: event.target.value })}
            placeholder="e.g. Master CapCut in 60 seconds"
            className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white outline-none transition focus:border-agent-blue/80 focus:shadow-glow"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">Primary audience</span>
          <input
            value={config.audience}
            onChange={(event) => onChange({ audience: event.target.value })}
            placeholder="e.g. beginner creators"
            className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white outline-none transition focus:border-agent-blue/80 focus:shadow-glow"
          />
        </label>

        <fieldset className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">Tone</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {toneOptions.map((tone) => (
              <button
                key={tone.value}
                type="button"
                onClick={() => onChange({ tone: tone.value })}
                className={`rounded-xl border p-3 text-left transition ${
                  config.tone === tone.value
                    ? "border-agent-blue/80 bg-agent-blue/20 text-white"
                    : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-agent-blue/40 hover:bg-agent-blue/10"
                }`}
              >
                <div className="text-sm font-semibold">{tone.label}</div>
                <p className="text-xs text-slate-400">{tone.description}</p>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">Pace</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {paceOptions.map((pace) => (
              <button
                key={pace.value}
                type="button"
                onClick={() => onChange({ pace: pace.value })}
                className={`rounded-xl border p-3 text-left transition ${
                  config.pace === pace.value
                    ? "border-agent-purple/80 bg-agent-purple/20 text-white"
                    : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-agent-purple/40 hover:bg-agent-purple/10"
                }`}
              >
                <div className="text-sm font-semibold">{pace.label}</div>
                <p className="text-xs text-slate-400">{pace.description}</p>
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">Desired duration</span>
          <div className="flex flex-wrap gap-2">
            {durations.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => onChange({ durationSeconds: duration })}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  config.durationSeconds === duration
                    ? "bg-agent-blue text-white"
                    : "bg-slate-900/60 text-slate-300 hover:bg-agent-blue/20"
                }`}
              >
                {duration}s
              </button>
            ))}
            <input
              type="number"
              min={15}
              max={75}
              value={config.durationSeconds}
              onChange={(event) => onChange({ durationSeconds: Number(event.target.value) })}
              className="w-24 rounded-xl border border-white/10 bg-slate-950/60 p-2 text-sm text-white focus:border-agent-blue/80 focus:shadow-glow"
            />
          </div>
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-200">Call to action</span>
          <input
            value={config.callToAction}
            onChange={(event) => onChange({ callToAction: event.target.value })}
            placeholder="e.g. Download the free checklist"
            className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white outline-none transition focus:border-agent-blue/80 focus:shadow-glow"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Idea starters</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((idea) => (
              <button
                key={idea}
                type="button"
                onClick={() => onChange({ topic: idea })}
                className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs text-slate-300 hover:border-agent-blue/40 hover:text-white"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-agent-blue px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-agent-blue/40 transition hover:bg-agent-purple disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {generating ? "Crafting..." : "Generate short package"}
        </button>
      </div>
    </section>
  );
}

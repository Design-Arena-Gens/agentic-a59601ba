"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { ShortPlan, ShortSegment } from "@/lib/types";

interface SegmentsBoardProps {
  plan: ShortPlan;
  onRegenerate: (segment: ShortSegment) => void;
}

export function SegmentsBoard({ plan, onRegenerate }: SegmentsBoardProps) {
  const [lastCopiedId, setLastCopiedId] = useState<string | null>(null);

  const handleCopy = async (segment: ShortSegment) => {
    await navigator.clipboard.writeText(segment.script);
    setLastCopiedId(segment.id);
    setTimeout(() => setLastCopiedId(null), 2000);
  };

  return (
    <section className="space-y-4">
      {plan.segments.map((segment) => (
        <article
          key={segment.id}
          className="group rounded-3xl border border-white/5 bg-slate-900/60 p-6 transition hover:border-agent-blue/40 hover:bg-slate-900/90"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">{segment.title}</span>
              <h3 className="mt-1 text-xl font-semibold text-white">{getSegmentLabel(segment)}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="rounded-full bg-slate-800/70 px-3 py-1 font-semibold text-slate-200">{segment.durationSeconds}s</span>
              <button
                type="button"
                onClick={() => onRegenerate(segment)}
                className="rounded-full border border-white/10 px-4 py-1 font-medium text-slate-200 transition hover:border-agent-purple/60 hover:text-agent-purple"
              >
                Remix
              </button>
              <button
                type="button"
                onClick={() => handleCopy(segment)}
                className="rounded-full bg-white/10 px-4 py-1 font-medium text-white transition hover:bg-agent-blue"
              >
                {lastCopiedId === segment.id ? "Copied" : "Copy script"}
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-200">
            {highlightEmphasis(segment)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="rounded-full bg-slate-800/80 px-3 py-1">B-roll: {segment.broll}</span>
            {segment.emphasis && segment.emphasis.length > 0 ? (
              <span className="rounded-full bg-agent-purple/20 px-3 py-1 text-agent-purple">
                Emphasis: {Array.from(new Set(segment.emphasis)).slice(0, 4).join(", ")}
              </span>
            ) : null}
          </div>
        </article>
      ))}
    </section>
  );
}

function getSegmentLabel(segment: ShortSegment): string {
  switch (segment.label) {
    case "hook":
      return "Scroll-stopping intro";
    case "value":
      return "Value beat";
    case "transition":
      return "Speed bump";
    case "cta":
      return "Call to action";
    case "outro":
      return "Outro";
    default:
      return "Segment";
  }
}

function highlightEmphasis(segment: ShortSegment): ReactNode {
  if (!segment.emphasis || segment.emphasis.length === 0) {
    return segment.script;
  }

  return segment.script.split(/(\s+)/).map((chunk, index) => {
    const trimmed = chunk.replace(/[^a-z0-9]/gi, "").toLowerCase();
    const shouldHighlight = segment.emphasis?.some((word) => word.toLowerCase() === trimmed);
    if (!shouldHighlight) {
      return <span key={index}>{chunk}</span>;
    }
    return (
      <span key={index} className="text-agent-blue">
        {chunk}
      </span>
    );
  });
}

"use client";

import { motion } from "framer-motion";
import type { ShortPlan } from "@/lib/types";

interface PlanSummaryProps {
  plan: ShortPlan;
}

export function PlanSummary({ plan }: PlanSummaryProps) {
  const totalDuration = plan.segments.reduce((acc, segment) => acc + segment.durationSeconds, 0);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
      <header className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Step 2</span>
          <h2 className="mt-1 text-2xl font-semibold text-white">Agent output</h2>
        </div>
        <div className="rounded-full bg-agent-blue/15 px-4 py-2 text-xs font-medium text-agent-blue">Ready-to-shoot kit</div>
      </header>

      <p className="mt-4 text-sm text-slate-300">{plan.summary}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SummaryStat label="Duration" value={`${Math.round(totalDuration)}s`} detail="Hook-balanced pacing" />
        <SummaryStat label="Shots" value={`${plan.segments.filter((segment) => segment.label === "value").length + 2}`} detail="Value beats + CTA" />
        <SummaryStat label="Captions" value={`${plan.captions.length}`} detail="Auto-timed lines" />
      </div>

      <motion.div
        className="mt-6 h-3 rounded-full bg-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-agent-blue via-agent-purple to-sky-400"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (totalDuration / plan.config.durationSeconds) * 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
    </section>
  );
}

interface SummaryStatProps {
  label: string;
  value: string;
  detail: string;
}

function SummaryStat({ label, value, detail }: SummaryStatProps) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <p className="text-xs text-slate-400">{detail}</p>
    </div>
  );
}

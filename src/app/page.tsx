"use client";

import { useMemo, useState } from "react";
import { AgentConfigurator } from "@/components/AgentConfigurator";
import { DownloadPanel } from "@/components/DownloadPanel";
import { PlanSummary } from "@/components/PlanSummary";
import { SegmentsBoard } from "@/components/SegmentsBoard";
import { StoryboardPreview } from "@/components/StoryboardPreview";
import { getDefaultConfig } from "@/lib/defaults";
import { generateShortPlan, regenerateSegment } from "@/lib/generator";
import type { AgentConfig, ShortPlan, ShortSegment } from "@/lib/types";

const topicBank = [
  "Turn 1 video into 5 platforms",
  "3 hooks to sell digital products",
  "Behind the scenes of viral recipes",
  "AI hacks every editor should know",
  "Morning routine for unstoppable focus",
  "Design trends in 2024 you can’t skip",
  "Storytelling tips that keep watch time high"
];

export default function Home() {
  const [config, setConfig] = useState<AgentConfig>(() => getDefaultConfig());
  const [plan, setPlan] = useState<ShortPlan>(() => generateShortPlan(getDefaultConfig()));
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestions = useMemo(() => topicBank.slice(0, 6), []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const nextPlan = generateShortPlan(config);
      setPlan(nextPlan);
      setIsGenerating(false);
    }, 220);
  };

  const handleConfigChange = (partial: Partial<AgentConfig>) => {
    setConfig((previous) => ({ ...previous, ...partial }));
  };

  const handleRegenerateSegment = (segment: ShortSegment) => {
    const remixed = regenerateSegment(plan, segment.id, config);
    setPlan(remixed);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12">
      <section className="rounded-3xl border border-agent-blue/40 bg-card-gradient p-10 text-white shadow-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-slate-200">
              <span>Agent</span>
              <span className="text-agent-blue">Shortsmith</span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Auto-generate YouTube Shorts scripts, captions, and storyboards in seconds.
            </h1>
            <p className="text-sm text-slate-200 md:max-w-xl">
              This agent reverse-engineers viral formats, balances pacing, and exports ready-to-edit assets tailored to your audience. Craft vertical masterpieces without staring at a blank doc.
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-slate-900/70 p-6 text-center text-sm text-slate-200">
            <div className="text-lg font-semibold text-white">Output bundle</div>
            <ul className="mt-3 space-y-2 text-left">
              <li>• Scroll-stopping hook & value beats</li>
              <li>• Auto-timed caption file</li>
              <li>• Storyboard PNG export</li>
              <li>• SEO-ready title, description & tags</li>
            </ul>
          </div>
        </div>
      </section>

      <AgentConfigurator config={config} onChange={handleConfigChange} onGenerate={handleGenerate} generating={isGenerating} suggestions={suggestions} />

      <div className="space-y-8">
        <PlanSummary plan={plan} />
        <SegmentsBoard plan={plan} onRegenerate={handleRegenerateSegment} />
        <StoryboardPreview plan={plan} />
        <DownloadPanel plan={plan} />
      </div>
    </main>
  );
}

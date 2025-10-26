"use client";

import { useMemo, useRef, useState } from "react";
import type { ShortPlan, ShortSegment } from "@/lib/types";

interface StoryboardPreviewProps {
  plan: ShortPlan;
}

export function StoryboardPreview({ plan }: StoryboardPreviewProps) {
  const slideRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [exporting, setExporting] = useState(false);
  const totalDuration = useMemo(
    () => plan.segments.reduce((acc, segment) => acc + segment.durationSeconds, 0),
    [plan.segments]
  );

  const handleExport = async () => {
    if (exporting) {
      return;
    }

    setExporting(true);
    const topicSlug = plan.config.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);

    try {
      const htmlToImage = await import("html-to-image");
      const JSZip = (await import("jszip")).default;
      const { saveAs } = await import("file-saver");

      const zip = new JSZip();
      const slides = Array.from(slideRefs.current.values());

      for (let index = 0; index < slides.length; index += 1) {
        const element = slides[index];
        if (!element) continue;
        const dataUrl = await htmlToImage.toPng(element, {
          pixelRatio: 2,
          cacheBust: true,
          quality: 1
        });

        const base64 = dataUrl.split(",")[1];
        zip.file(`slide-${index + 1}.png`, base64 ?? "", { base64: true });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `short-storyboard-${topicSlug || "topic"}.zip`);
    } catch (error) {
      console.error("Failed to export storyboard", error);
    } finally {
      setExporting(false);
    }
  };

  const segments = useMemo(() => plan.segments.filter((segment) => segment.label !== "transition"), [plan.segments]);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Step 3</span>
          <h2 className="mt-1 text-2xl font-semibold text-white">Storyboard preview</h2>
          <p className="text-sm text-slate-300">
            Vertical-safe frames with text overlays. Export slides as PNGs for your editing tool.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="rounded-full bg-agent-purple px-4 py-2 text-sm font-semibold text-white transition hover:bg-agent-blue disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {exporting ? "Rendering..." : "Export PNG storyboard"}
        </button>
      </div>

      <div className="mt-6 flex gap-6 overflow-x-auto pb-4">
        {segments.map((segment, index) => (
          <StoryboardSlide
            key={segment.id}
            segment={segment}
            index={index}
            totalDuration={totalDuration}
            register={(node) => {
              if (node) {
                slideRefs.current.set(segment.id, node);
              } else {
                slideRefs.current.delete(segment.id);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}

interface StoryboardSlideProps {
  segment: ShortSegment;
  index: number;
  totalDuration: number;
  register: (element: HTMLDivElement | null) => void;
}

function StoryboardSlide({ segment, index, totalDuration, register }: StoryboardSlideProps) {
  return (
    <div className="flex w-56 flex-col items-center gap-3">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Beat {index + 1}</div>
      <div
        ref={register}
        className="flex aspect-[9/16] w-full flex-col justify-between rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-agent-purple/30 p-5 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-slate-300">{segment.title}</div>
        <p className="text-base font-semibold text-white">{segment.script}</p>
        <div className="text-xs text-slate-300">{segment.broll}</div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-agent-blue to-agent-purple"
          style={{ width: `${Math.round((segment.durationSeconds / totalDuration) * 100)}%` }}
        />
      </div>
    </div>
  );
}

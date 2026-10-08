"use client";

import { ArrowsInSimple, ArrowsOutSimple } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { chapters, roles } from "@/data/roles";
import type { ChapterId } from "@/data/types";
import { easeOutExpo, springSnappy } from "@/lib/motion";
import { useStore } from "@/lib/store";
import { Reveal, SectionHeading } from "@/components/ui/primitives";
import { CareerTimeline, chapterColor } from "./CareerTimeline";
import { RoleCard } from "./RoleCard";

function ChapterFilter() {
  const { t, l, chapter, setChapter } = useStore();
  const options: { id: ChapterId | "all"; label: string; count: number }[] = [
    { id: "all", label: t.experience.all, count: roles.length },
    ...chapters.map((c) => ({ id: c.id, label: l(c.label), count: roles.filter((r) => r.chapter === c.id).length })),
  ];

  return (
    <div className="-mx-4 -my-4 overflow-x-auto px-4 py-4 no-scrollbar">
      <div className="inline-flex gap-1 rounded-full p-1 bg-paper/80 shadow-[0_12px_40px_-18px_rgba(28,42,34,0.4)] ring-1 ring-ink/[0.08] backdrop-blur-xl">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setChapter(o.id)}
            aria-pressed={chapter === o.id}
            className={clsx(
              "relative isolate flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-300",
              chapter === o.id ? "text-paper" : "text-muted hover:text-ink",
            )}
          >
            {chapter === o.id && (
              <motion.span
                layoutId="chapter-pill"
                transition={springSnappy}
                className="absolute inset-0 -z-10 rounded-full bg-hunter"
              />
            )}
            {o.id !== "all" && <span className={clsx("size-1.5 rounded-full", chapterColor[o.id])} />}
            {o.label}
            <span className={clsx("font-mono text-[11px]", chapter === o.id ? "text-paper/60" : "text-muted")}>
              {o.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const { t, l, chapter, openRoles, setAllRoles } = useStore();
  const visibleChapters = chapters.filter((c) => chapter === "all" || c.id === chapter);
  const allOpen = openRoles.size === roles.length;

  return (
    <section id="experience" className="relative bg-paper-2/60 py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          accent={t.experience.titleAccent}
        />

        <Reveal className="mt-14 lg:mt-20">
          <CareerTimeline />
        </Reveal>

        <div className="pointer-events-none sticky top-[4.5rem] z-20 mt-14 flex items-center justify-between gap-3 py-3 sm:top-[5.25rem]">
          <div className="pointer-events-auto min-w-0">
            <ChapterFilter />
          </div>
          <button
            type="button"
            onClick={() => setAllRoles(!allOpen)}
            aria-label={allOpen ? t.experience.collapseAll : t.experience.expandAll}
            className="pointer-events-auto inline-flex shrink-0 items-center gap-2 rounded-full p-3 text-[13px] font-medium text-ink transition-[background-color,transform] duration-300 hover:bg-paper active:scale-[0.97] sm:px-4 sm:py-2.5 bg-paper/80 shadow-[0_12px_40px_-18px_rgba(28,42,34,0.4)] ring-1 ring-ink/[0.08] backdrop-blur-xl"
          >
            {allOpen ? <ArrowsInSimple size={15} weight="light" /> : <ArrowsOutSimple size={15} weight="light" />}
            <span className="hidden sm:inline">{allOpen ? t.experience.collapseAll : t.experience.expandAll}</span>
          </button>
        </div>

        <div className="relative mt-4">
          {/* Continuous rail */}
          <span aria-hidden className="absolute top-0 bottom-0 left-[12px] w-px bg-gradient-to-b from-fern/40 via-ink/10 to-transparent sm:left-[24px]" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chapter}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.22, ease: easeOutExpo } }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              {visibleChapters.map((c, ci) => {
                const items = roles.filter((r) => r.chapter === c.id);
                const number = String(chapters.length - chapters.indexOf(c)).padStart(2, "0");
                return (
                  <div key={c.id} className={clsx(ci > 0 && "mt-20")}>
                    <Reveal className="relative pl-8 sm:pl-12">
                      <span
                        aria-hidden
                        className="absolute top-2.5 left-[3px] flex size-[19px] items-center justify-center rounded-full bg-paper ring-1 ring-ink/15 sm:left-[15px]"
                      >
                        <span className={clsx("size-2 rounded-full", chapterColor[c.id])} />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                        {number} · {l(c.period)}
                      </span>
                      <h3 className="mt-2 font-display text-[clamp(2rem,3.6vw,3rem)] leading-none tracking-[-0.02em] text-ink">
                        {l(c.label)}
                      </h3>
                      <p className="mt-3 max-w-xl text-[14.5px] text-muted">{l(c.blurb)}</p>
                    </Reveal>

                    <div className="mt-8 space-y-4">
                      {items.map((role, i) => (
                        <Reveal key={role.id} delay={Math.min(i * 0.06, 0.24)}>
                          <RoleCard role={role} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

"use client";

import { clsx } from "clsx";
import { motion } from "motion/react";
import { useState } from "react";
import { roles } from "@/data/roles";
import type { ChapterId } from "@/data/types";
import { formatRange, ymToYear } from "@/lib/dates";
import { easeOutExpo } from "@/lib/motion";
import { useNow } from "@/lib/now";
import { useStore } from "@/lib/store";
import { Bezel } from "@/components/ui/primitives";

export const chapterColor: Record<ChapterId, string> = {
  builder: "bg-fern",
  revenue: "bg-hunter",
  finance: "bg-sage",
};

const AXIS_START = 2016.75;

export function CareerTimeline() {
  const { t, l, focusRole, chapter } = useStore();
  const now = useNow();
  const axisEnd = ymToYear(now) + 0.5;
  const span = axisEnd - AXIS_START;
  const pos = (year: number) => ((year - AXIS_START) / span) * 100;
  const years = Array.from({ length: Math.floor(axisEnd) - 2016 }, (_, i) => 2017 + i);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Bezel innerClassName="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[11px] tracking-[0.2em] text-hunter uppercase">{t.experience.timeline}</p>
        <p className="text-[12.5px] text-muted">{t.experience.timelineHint}</p>
      </div>

      <div className="mt-6 overflow-x-auto no-scrollbar">
        <div className="min-w-[640px]">
          <div className="relative">
            {/* Year gridlines */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 left-[132px]">
              {years.map((y) => (
                <span key={y} className="absolute inset-y-0 w-px bg-ink/[0.06]" style={{ left: `${pos(y)}%` }} />
              ))}
              <span
                className="absolute inset-y-0 w-px bg-fern/50"
                style={{ left: `${pos(ymToYear(now) + 1 / 12)}%` }}
              />
            </div>

            <ul className="relative space-y-1.5">
              {roles.map((role, i) => {
                const start = ymToYear(role.start);
                const end = ymToYear(role.end ?? now) + 1 / 12;
                const dimmed = chapter !== "all" && chapter !== role.chapter;
                const isHovered = hovered === role.id;
                return (
                  <li key={role.id} className="flex items-center">
                    <span
                      className={clsx(
                        "w-[132px] shrink-0 truncate pr-4 text-[12.5px] transition-colors duration-300",
                        isHovered ? "text-ink" : "text-muted",
                        dimmed && "opacity-40",
                      )}
                    >
                      {role.company}
                    </span>
                    <div className="relative h-7 flex-1">
                      <motion.button
                        type="button"
                        onClick={() => focusRole(role.id)}
                        onMouseEnter={() => setHovered(role.id)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(role.id)}
                        onBlur={() => setHovered(null)}
                        aria-label={`${l(role.title)} · ${role.company} · ${formatRange(role.start, role.end, t)}`}
                        className={clsx(
                          "absolute top-1/2 h-3 origin-left -translate-y-1/2 rounded-full transition-[opacity,height] duration-300 ease-drawer",
                          chapterColor[role.chapter],
                          isHovered && "h-4",
                          dimmed ? "opacity-25" : "opacity-100",
                        )}
                        style={{ left: `${pos(start)}%`, width: `${Math.max(pos(end) - pos(start), 1.2)}%` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.15 + (roles.length - i) * 0.06 }}
                      >
                        {role.end === null && (
                          <span className="absolute top-1/2 -right-0.5 size-2 -translate-y-1/2 animate-pulse-dot rounded-full bg-fern ring-2 ring-[#f8f7f3]" />
                        )}
                      </motion.button>
                      {isHovered && (
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: easeOutExpo }}
                          className="pointer-events-none absolute bottom-full z-10 mb-1 rounded-lg bg-ink px-2.5 py-1.5 text-[11.5px] whitespace-nowrap text-paper shadow-lg"
                          style={{
                            left: `${Math.min(pos(start), 70)}%`,
                          }}
                        >
                          {l(role.title)} · {formatRange(role.start, role.end, t)}
                        </motion.span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Year axis */}
          <div className="relative mt-3 ml-[132px] h-5">
            {years.map((y) => (
              <span
                key={y}
                className="absolute -translate-x-1/2 font-mono text-[10.5px] text-muted/80"
                style={{ left: `${pos(y)}%` }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Bezel>
  );
}

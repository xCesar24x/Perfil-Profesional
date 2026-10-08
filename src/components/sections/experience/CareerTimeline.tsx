"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { roles } from "@/data/roles";
import type { ChapterId, Role, YearMonth } from "@/data/types";
import { formatDuration, formatRange, formatYM, monthsBetween, ymToYear } from "@/lib/dates";
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
/** Row height in px. Rows touch, so the pointer never falls into a gap between companies. */
const ROW = 34;
const LABEL = 132;

const guideIn = { duration: 0.5, ease: easeOutExpo };

function span(role: Role, now: YearMonth) {
  return { start: ymToYear(role.start), end: ymToYear(role.end ?? now) + 1 / 12 };
}

export function CareerTimeline() {
  const { t, l, focusRole, chapter } = useStore();
  const now = useNow();
  const axisEnd = ymToYear(now) + 0.5;
  const pos = (year: number) => ((year - AXIS_START) / (axisEnd - AXIS_START)) * 100;
  const years = Array.from({ length: Math.floor(axisEnd) - 2016 }, (_, i) => 2017 + i);
  const [hovered, setHovered] = useState<string | null>(null);

  const index = roles.findIndex((r) => r.id === hovered);
  const active = index >= 0 ? roles[index] : null;
  const activeSpan = active ? span(active, now) : null;
  const startLabel = active ? formatYM(active.start, t) : "";
  const endLabel = active ? (active.end ? formatYM(active.end, t) : t.experience.present) : "";

  return (
    <Bezel innerClassName="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[11px] tracking-[0.2em] text-hunter uppercase">{t.experience.timeline}</p>
        <p className="text-[12.5px] text-muted">{t.experience.timelineHint}</p>
      </div>

      <div className="mt-6 overflow-x-auto no-scrollbar">
        <div className="min-w-[640px]">
          <div className="relative">
            {/* Year gridlines, today marker and the vertical guides of the hovered role */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0" style={{ left: LABEL }}>
              {years.map((y) => (
                <span key={y} className="absolute inset-y-0 w-px bg-ink/[0.06]" style={{ left: `${pos(y)}%` }} />
              ))}
              <span className="absolute inset-y-0 w-px bg-fern/50" style={{ left: `${pos(ymToYear(now) + 1 / 12)}%` }} />

              <AnimatePresence>
                {active && activeSpan && (
                  <motion.div
                    key={active.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    {[activeSpan.start, activeSpan.end].map((x, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-0 origin-top border-l border-dashed border-fern/70"
                        style={{ left: `${pos(x)}%`, top: index * ROW + ROW / 2, bottom: -12 }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ ...guideIn, delay: 0.08 + i * 0.05 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ul className="relative" onMouseLeave={() => setHovered(null)}>
              {roles.map((role, i) => {
                const { start, end } = span(role, now);
                const isActive = hovered === role.id;
                const dimmed = hovered ? !isActive : chapter !== "all" && chapter !== role.chapter;
                return (
                  <li
                    key={role.id}
                    className={clsx(
                      "flex items-center rounded-lg transition-colors duration-300",
                      isActive && "bg-ink/[0.04]",
                    )}
                    style={{ height: ROW }}
                    onMouseEnter={() => setHovered(role.id)}
                  >
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => focusRole(role.id)}
                      className={clsx(
                        "shrink-0 truncate pr-4 pl-2 text-left text-[12.5px] transition-[color,opacity] duration-300",
                        isActive ? "font-medium text-ink" : "text-muted",
                        dimmed && "opacity-40",
                      )}
                      style={{ width: LABEL }}
                    >
                      {role.company}
                    </button>
                    <div className="relative h-full flex-1">
                      {/* Leader from the company name to the start of its bar */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            aria-hidden
                            className="pointer-events-none absolute top-1/2 left-0 h-0 origin-left border-t border-dashed border-fern/70"
                            style={{ width: `${pos(start)}%` }}
                            initial={{ scaleX: 0, opacity: 1 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            transition={guideIn}
                          />
                        )}
                      </AnimatePresence>

                      <motion.button
                        type="button"
                        onClick={() => focusRole(role.id)}
                        onFocus={() => setHovered(role.id)}
                        onBlur={() => setHovered(null)}
                        aria-label={`${l(role.title)} · ${role.company} · ${formatRange(role.start, role.end, t)}`}
                        className={clsx(
                          "absolute top-1/2 h-3 origin-left -translate-y-1/2 rounded-full transition-[opacity,height,box-shadow] duration-300 ease-drawer",
                          chapterColor[role.chapter],
                          isActive && "h-4 shadow-[0_6px_16px_-6px_rgba(28,42,34,0.55)]",
                          dimmed ? "opacity-30" : "opacity-100",
                        )}
                        style={{ left: `${pos(start)}%`, width: `${Math.max(pos(end) - pos(start), 1.2)}%` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.15 + (roles.length - i) * 0.06 }}
                      >
                        {role.end === null && (
                          <span className="absolute top-1/2 -right-0.5 size-2 -translate-y-1/2 animate-pulse-dot rounded-full bg-fern ring-2 ring-surface" />
                        )}
                      </motion.button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, y: i === 0 ? -4 : 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            transition={{ duration: 0.3, ease: easeOutExpo }}
                            className={clsx(
                              "pointer-events-none absolute z-10 rounded-lg bg-ink px-2.5 py-1.5 text-[11.5px] whitespace-nowrap text-paper shadow-lg",
                              // The top row has no room above it inside the scroll area.
                              i === 0 ? "top-[calc(50%+12px)]" : "bottom-[calc(50%+12px)]",
                            )}
                            // Bars on the right half anchor the tooltip to their end so it never runs off the chart.
                            style={pos(start) > 55 ? { right: `${100 - pos(end)}%` } : { left: `${pos(start)}%` }}
                          >
                            {l(role.title)} · {formatDuration(monthsBetween(role.start, role.end, now), t)}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Year axis, with the hovered role's exact dates where its guides land */}
          <div className="relative mt-3 h-6" style={{ marginLeft: LABEL }}>
            {years.map((y) => (
              <span
                key={y}
                className="absolute top-0.5 -translate-x-1/2 font-mono text-[11px] text-muted"
                style={{ left: `${pos(y)}%` }}
              >
                {y}
              </span>
            ))}
            <AnimatePresence>
              {active && activeSpan && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ ...guideIn, delay: 0.2 }}
                >
                  {(pos(activeSpan.end) - pos(activeSpan.start) < 12
                    ? [{ x: (pos(activeSpan.start) + pos(activeSpan.end)) / 2, text: `${startLabel} — ${endLabel}` }]
                    : [
                        { x: pos(activeSpan.start), text: startLabel },
                        { x: pos(activeSpan.end), text: endLabel },
                      ]
                  ).map((chip) => (
                    <span
                      key={chip.text}
                      className={clsx(
                        "absolute top-0 z-10 rounded-md bg-ink px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-paper",
                        // Near either end, align the chip inward instead of centring it past the edge.
                        chip.x > 85 ? "-translate-x-full" : chip.x < 15 ? "translate-x-0" : "-translate-x-1/2",
                      )}
                      style={{ left: `${chip.x}%` }}
                    >
                      {chip.text}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Bezel>
  );
}

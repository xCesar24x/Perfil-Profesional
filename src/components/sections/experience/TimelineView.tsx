"use client";

import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { clsx } from "clsx";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from "react";
import { chapters, roles } from "@/data/roles";
import type { ChapterId, Role } from "@/data/types";
import { formatRange } from "@/lib/dates";
import { easeOutExpo } from "@/lib/motion";
import { useStore } from "@/lib/store";

/** Oldest first, so the line reads left to right like a timeline. */
const ordered: Role[] = [...roles].sort(
  (a, b) => a.start.localeCompare(b.start) || (a.end ?? "9999").localeCompare(b.end ?? "9999"),
);
const LAST = ordered.length - 1;

const dotColor: Record<ChapterId, string> = {
  finance: "bg-sage",
  revenue: "bg-bone",
  builder: "bg-brass-light",
};

const subscribeResize = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
function useViewportWidth() {
  return useSyncExternalStore(subscribeResize, () => window.innerWidth, () => 1280);
}

function Milestone({
  role,
  index,
  x,
  step,
  onOpen,
}: {
  role: Role;
  index: number;
  x: MotionValue<number>;
  step: number;
  onOpen: (id: string) => void;
}) {
  const { t, l } = useStore();
  // 1 when the milestone sits at the centre of the screen, fading to 0 a step and a half away.
  const focus = useTransform(x, (v) => Math.max(0, 1 - Math.abs(index * step + v) / (step * 1.5)));
  const opacity = useTransform(focus, [0, 1], [0.28, 1]);
  const scale = useTransform(focus, [0, 1], [0.9, 1.05]);
  const glow = useTransform(focus, [0, 1], [
    "0 0 0px 0px rgba(217,184,114,0)",
    "0 0 24px 6px rgba(217,184,114,0.55)",
  ]);
  const above = index % 2 === 0;
  const year = role.start.slice(0, 4);
  const showYear = index === 0 || ordered[index - 1].start.slice(0, 4) !== year;
  const chapter = chapters.find((c) => c.id === role.chapter)!;

  return (
    <motion.div className="absolute top-1/2" style={{ left: index * step, opacity }}>
      <motion.div
        initial={{ opacity: 0, y: above ? 16 : -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.35 + index * 0.07 }}
      >
        {showYear && (
          <span
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 font-display text-[clamp(6rem,14vw,11rem)] leading-none text-white/[0.05] select-none"
            style={{ top: above ? 36 : undefined, bottom: above ? undefined : 36 }}
          >
            {year}
          </span>
        )}

        <span
          aria-hidden
          className={clsx(
            "absolute left-0 h-11 w-px -translate-x-1/2",
            above ? "bottom-0 bg-gradient-to-t from-white/35 to-transparent" : "top-0 bg-gradient-to-b from-white/35 to-transparent",
          )}
        />
        <motion.span
          aria-hidden
          className={clsx(
            "absolute top-0 left-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-abyss",
            dotColor[role.chapter],
            role.end === null && "animate-pulse-dot",
          )}
          style={{ boxShadow: glow }}
        />

        <motion.button
          type="button"
          onClick={() => onOpen(role.id)}
          style={{ scale }}
          className={clsx(
            "absolute left-0 w-[min(17rem,70vw)] -translate-x-1/2 rounded-2xl bg-white/[0.04] p-4 text-left ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.08]",
            above ? "bottom-12 origin-bottom" : "top-12 origin-top",
          )}
        >
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-bone/65 uppercase">
            <span className={clsx("size-1.5 rounded-full", dotColor[role.chapter])} />
            {formatRange(role.start, role.end, t)}
          </span>
          <span className="mt-2.5 block text-[13px] font-medium text-brass-light">{role.company}</span>
          <span className="mt-1 block font-display text-[1.45rem] leading-[1.1] text-bone text-balance">{l(role.title)}</span>
          <span className="mt-2 block text-[11.5px] text-bone/50">{l(chapter.label)}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/**
 * Immersive one-line summary of the career: the page dims behind a horizontal
 * timeline that follows the cursor, keeping only dates, companies and roles.
 */
export function TimelineView() {
  const { t, timelineOpen, setTimelineOpen, focusRole } = useStore();
  const vw = useViewportWidth();
  const step = Math.round(Math.min(340, Math.max(250, vw * 0.24)));
  const min = -LAST * step;

  const target = useMotionValue(0);
  const x = useSpring(target, { stiffness: 70, damping: 20, mass: 1 });
  const progress = useTransform(x, (v) => Math.min(1, Math.max(0, -v / (LAST * step))));
  const intro = useRef<AnimationPlaybackControls | null>(null);
  const touchStart = useRef<{ x: number; target: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const clampX = (v: number) => Math.min(0, Math.max(min, v));
  const takeOver = () => {
    intro.current?.stop();
    intro.current = null;
  };
  const goTo = (index: number) => {
    takeOver();
    target.set(-Math.min(LAST, Math.max(0, index)) * step);
  };
  const currentIndex = () => Math.round(-target.get() / step);

  const close = () => setTimelineOpen(false);
  const open = (id: string) => {
    setTimelineOpen(false);
    window.setTimeout(() => focusRole(id), 380);
  };

  useEffect(() => {
    if (!timelineOpen) return;
    document.body.style.overflow = "hidden";
    target.jump(0);
    x.jump(0);
    closeRef.current?.focus();
    // Opening sweep: glide from the first role to today, then hand control to the cursor.
    intro.current = animate(target, -LAST * step, { duration: 2.8, ease: [0.65, 0, 0.35, 1], delay: 0.8 });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTimelineOpen(false);
      else if (e.key === "ArrowRight") goTo(currentIndex() + 1);
      else if (e.key === "ArrowLeft") goTo(currentIndex() - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      intro.current?.stop();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineOpen, step]);

  const onPointerMove = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") {
      takeOver();
      // Dead zones at both edges so the ends are easy to reach.
      const r = Math.min(1, Math.max(0, (e.clientX - vw * 0.12) / (vw * 0.76)));
      target.set(r * min);
    } else if (touchStart.current) {
      target.set(clampX(touchStart.current.target + (e.clientX - touchStart.current.x) * 1.3));
    }
  };

  return (
    <AnimatePresence>
      {timelineOpen && (
        <motion.div
          key="timeline"
          role="dialog"
          aria-modal="true"
          aria-label={t.experience.timelineView}
          data-tone="dark"
          className="fixed inset-0 z-[45] touch-none overflow-hidden bg-abyss/85 text-bone backdrop-blur-xl select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          transition={{ duration: 0.5 }}
          onPointerMove={onPointerMove}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") {
              takeOver();
              touchStart.current = { x: e.clientX, target: target.get() };
            }
          }}
          onPointerUp={() => {
            if (touchStart.current) goTo(currentIndex());
            touchStart.current = null;
          }}
          onWheel={(e) => {
            takeOver();
            target.set(clampX(target.get() - (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 1.2));
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(88,129,87,0.35),transparent_70%)]"
          />

          <header className="relative flex items-start justify-between gap-6 px-6 pt-8 sm:px-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
            >
              <p className="font-mono text-[11px] tracking-[0.22em] text-sage-soft uppercase">{t.experience.timelineEyebrow}</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-[-0.02em]">
                {t.experience.timelineTitle}
              </h2>
            </motion.div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t.nav.close}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-white/10 transition-colors hover:bg-white/[0.14]"
            >
              <X size={18} weight="light" />
            </button>
          </header>

          {/* The line */}
          <motion.div className="absolute top-[54%] left-1/2 h-0" style={{ x }}>
            <motion.span
              aria-hidden
              className="absolute top-0 h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(218,215,205,0.25)_12%,#a3b18a_55%,#d9b872_88%,transparent)]"
              style={{ left: -vw / 2, width: LAST * step + vw }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.15 }}
            />
            {ordered.map((role, i) => (
              <Milestone key={role.id} role={role} index={i} x={x} step={step} onOpen={open} />
            ))}
          </motion.div>

          <footer className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 pb-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => goTo(currentIndex() - 1)}
                aria-label={t.experience.previous}
                className="flex size-9 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.12]"
              >
                <ArrowLeft size={15} weight="light" />
              </button>
              <div className="flex items-center gap-3 font-mono text-[11px] text-bone/60">
                <span>{ordered[0].start.slice(0, 4)}</span>
                <span className="relative h-px w-[min(18rem,50vw)] bg-white/15">
                  <motion.span
                    className="absolute inset-0 origin-left bg-gradient-to-r from-sage to-brass-light"
                    style={{ scaleX: progress }}
                  />
                </span>
                <span>{t.experience.present}</span>
              </div>
              <button
                type="button"
                onClick={() => goTo(currentIndex() + 1)}
                aria-label={t.experience.next}
                className="flex size-9 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.12]"
              >
                <ArrowRight size={15} weight="light" />
              </button>
            </div>
            <p className="text-center text-[12px] text-bone/55">
              <span className="hidden [@media(pointer:fine)]:inline">{t.experience.timelineViewHint}</span>
              <span className="[@media(pointer:fine)]:hidden">{t.experience.timelineViewHintTouch}</span>
            </p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { animate, motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { useLaser } from "@/lib/laser";

const INTERACTIVE = "a, button, input, select, textarea, label, [role='option'], [role='button']";

// Trailing glow: each ghost follows on a softer spring, so the trail stretches with speed.
const TRAIL = [
  { stiffness: 900, damping: 45, size: 9, opacity: 0.55 },
  { stiffness: 520, damping: 40, size: 7, opacity: 0.38 },
  { stiffness: 320, damping: 34, size: 5.5, opacity: 0.24 },
  { stiffness: 200, damping: 30, size: 4, opacity: 0.14 },
];

function Ghost({ x, y, i }: { x: MotionValue<number>; y: MotionValue<number>; i: number }) {
  const { stiffness, damping, size, opacity } = TRAIL[i];
  const sx = useSpring(x, { stiffness, damping, mass: 0.6 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.6 });
  return (
    <motion.span
      className="absolute top-0 left-0 rounded-full bg-[#ff3b30]"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity,
        boxShadow: `0 0 ${size}px ${size / 2}px rgba(255,59,48,0.45)`,
      }}
    />
  );
}

/**
 * Red presentation laser that replaces the mouse cursor, built for screen
 * sharing: a glowing dot, a short trail and a ripple on every click.
 */
export function LaserPointer() {
  const [on, setOn] = useLaser();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useSpring(1, { stiffness: 500, damping: 30 });
  const visible = useMotionValue(0);
  const rippleRef = useRef<HTMLSpanElement>(null);

  // Keyboard toggle: "L", ignored while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "l" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable='true']")) return;
      setOn(!on);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [on, setOn]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const root = document.documentElement;
    const active = on && fine.matches;
    root.classList.toggle("laser-on", active);
    if (!active) {
      visible.set(0);
      return;
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x.set(e.clientX);
      y.set(e.clientY);
      visible.set(1);
      const target = e.target as Element | null;
      scale.set(target?.closest(INTERACTIVE) ? 1.6 : 1);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !rippleRef.current) return;
      const ripple = rippleRef.current;
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      animate(ripple, { scale: [0.4, 3.2], opacity: [0.9, 0] }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    };
    const hide = () => visible.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    root.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      root.classList.remove("laser-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      root.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [on, x, y, scale, visible]);

  if (!on) return null;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[80]" style={{ opacity: visible }}>
      {!reduce && TRAIL.map((_, i) => <Ghost key={i} x={x} y={y} i={i} />)}
      <span
        ref={rippleRef}
        className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ff3b30] opacity-0"
      />
      <motion.span
        className="absolute top-0 left-0 -mt-1.5 -ml-1.5 flex size-3 items-center justify-center rounded-full bg-[#ff3b30] shadow-[0_0_6px_2px_rgba(255,59,48,0.95),0_0_20px_7px_rgba(255,59,48,0.45)]"
        style={{ x, y, scale }}
      >
        <span className="size-1 rounded-full bg-[#ffd9d6]" />
      </motion.span>
    </motion.div>
  );
}

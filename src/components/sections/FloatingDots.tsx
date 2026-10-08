"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, type CSSProperties } from "react";

type Dot = {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  dx: number;
  dy: number;
  duration: number;
  delay: number;
  twinkle: boolean;
  soft: boolean;
};

type Layer = { dots: Dot[]; depth: number };

// Fern barely contrasts with the green backdrop, so it only tints the large soft dots.
const SHARP = ["#a3b18a", "#dad7cd", "#c8d0b8", "#a3b18a"];
const SOFT = ["#588157", "#a3b18a", "#588157", "#dad7cd"];

/** Small deterministic PRNG so server and client render the same field. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

function makeLayer(
  rand: () => number,
  count: number,
  opts: {
    size: [number, number];
    opacity: [number, number];
    drift: number;
    duration: [number, number];
    soft: boolean;
  },
): Dot[] {
  const between = ([a, b]: [number, number]) => a + rand() * (b - a);
  const dots: Dot[] = [];
  while (dots.length < count) {
    const x = rand();
    const y = rand();
    // Denser toward the right and top, thinning out behind the headline.
    if (rand() > 0.45 + 0.55 * Math.max(x, 1 - y)) continue;
    dots.push({
      x: round(x * 100),
      y: round(y * 100),
      size: round(between(opts.size)),
      color: (opts.soft ? SOFT : SHARP)[Math.floor(rand() * 4)],
      opacity: round(between(opts.opacity)),
      dx: round((rand() * 2 - 1) * opts.drift),
      dy: round((rand() * 2 - 1) * opts.drift),
      duration: round(between(opts.duration)),
      delay: round(-rand() * 30),
      twinkle: rand() < 0.4,
      soft: opts.soft,
    });
  }
  return dots;
}

const rand = mulberry32(20261008);
const LAYERS: Layer[] = [
  {
    depth: 6,
    dots: makeLayer(rand, 60, { size: [2, 3.5], opacity: [0.35, 0.65], drift: 16, duration: [22, 34], soft: false }),
  },
  {
    depth: 14,
    dots: makeLayer(rand, 34, { size: [4, 7], opacity: [0.5, 0.9], drift: 26, duration: [16, 26], soft: false }),
  },
  {
    depth: 26,
    dots: makeLayer(rand, 12, { size: [18, 46], opacity: [0.2, 0.4], drift: 34, duration: [18, 30], soft: true }),
  },
];

function DotLayer({ layer, px, py }: { layer: Layer; px: MotionValue<number>; py: MotionValue<number> }) {
  const x = useTransform(px, (v) => v * layer.depth);
  const y = useTransform(py, (v) => v * layer.depth);
  return (
    <motion.div className="absolute inset-0" style={{ x, y }}>
      {layer.dots.map((d, i) => (
        <span
          key={i}
          className="enter-fade absolute"
          style={{ left: `${d.x}%`, top: `${d.y}%`, animationDelay: `${0.3 + (i % 12) * 0.08}s` }}
        >
          <span
            className={d.twinkle ? "dot-float dot-twinkle block rounded-full" : "dot-float block rounded-full"}
            style={
              {
                width: d.size,
                height: d.size,
                opacity: d.opacity,
                background: d.soft ? `radial-gradient(circle, ${d.color} 0%, transparent 70%)` : d.color,
                boxShadow: d.soft ? undefined : `0 0 ${round(d.size * 2.5)}px ${d.color}55`,
                "--o": d.opacity,
                "--dx": `${d.dx}px`,
                "--dy": `${d.dy}px`,
                "--dur": `${d.duration}s`,
                "--twinkle": `${round(d.duration / 3)}s`,
                "--delay": `${d.delay}s`,
              } as CSSProperties
            }
          />
        </span>
      ))}
    </motion.div>
  );
}

/**
 * Ambient field of palette-toned dots in three depths. Each dot drifts slowly;
 * the layers shift slightly with the pointer for a hint of parallax.
 */
export function FloatingDots() {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 40, damping: 20, mass: 1 });
  const py = useSpring(rawY, { stiffness: 40, damping: 20, mass: 1 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {LAYERS.map((layer, i) => (
        <DotLayer key={i} layer={layer} px={px} py={py} />
      ))}
    </div>
  );
}

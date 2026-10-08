"use client";

import { clsx } from "clsx";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";

export type Tone = "light" | "dark";

/** Heavy fade-up that resolves from a soft blur as the element enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "header";
}) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
    >
      {children}
    </Component>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.22em]",
        tone === "light"
          ? "bg-ink/[0.04] text-hunter ring-1 ring-ink/[0.07]"
          : "bg-white/[0.06] text-sage ring-1 ring-white/10",
      )}
    >
      <span className={clsx("size-1.5 rounded-full", tone === "light" ? "bg-fern" : "bg-sage")} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  tone = "light",
  className,
  aside,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro?: string;
  tone?: Tone;
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <div className={clsx("grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <Reveal className="lg:col-span-8">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          className={clsx(
            "mt-6 font-display text-[clamp(2.6rem,6vw,5.25rem)] leading-[0.95] tracking-[-0.02em] text-balance",
            tone === "light" ? "text-ink" : "text-bone",
          )}
        >
          {title}{" "}
          <em className={clsx("italic", tone === "light" ? "text-fern" : "text-sage")}>{accent}</em>
        </h2>
      </Reveal>
      {(intro || aside) && (
        <Reveal delay={0.1} className="lg:col-span-4 lg:pb-3">
          {intro && (
            <p
              className={clsx(
                "max-w-md text-[15px] leading-relaxed text-pretty",
                tone === "light" ? "text-muted" : "text-bone/70",
              )}
            >
              {intro}
            </p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  );
}

/**
 * Double-bezel enclosure: a hairline outer tray holding an inner core with its
 * own highlight and a concentric, slightly smaller radius.
 */
export function Bezel({
  children,
  tone = "light",
  className,
  innerClassName,
  ...rest
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
} & ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={clsx(
        "rounded-[1.75rem] p-1.5",
        tone === "light"
          ? "bg-ink/[0.035] ring-1 ring-ink/[0.06]"
          : "bg-white/[0.04] ring-1 ring-white/[0.08]",
        className,
      )}
    >
      <div
        className={clsx(
          "h-full rounded-[calc(1.75rem-0.375rem)]",
          tone === "light"
            ? "bg-[#f8f7f3] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_40px_-28px_rgba(28,42,34,0.35)]"
            : "bg-deep/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_60px_-30px_rgba(0,0,0,0.6)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Pill CTA with its trailing icon nested in its own circular island. */
export function IslandButton({
  children,
  icon,
  variant = "solid",
  tone = "light",
  className,
  href,
  onClick,
  download,
  external,
}: {
  children: ReactNode;
  icon: ReactNode;
  variant?: "solid" | "ghost";
  tone?: Tone;
  className?: string;
  href?: string;
  onClick?: () => void;
  download?: boolean;
  external?: boolean;
}) {
  const classes = clsx(
    "group relative inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-6 text-[14.5px] font-medium tracking-[-0.01em]",
    "transition-[transform,background-color,color,box-shadow] duration-500 ease-drawer active:scale-[0.97]",
    variant === "solid" &&
      tone === "dark" &&
      "bg-bone text-abyss shadow-[0_10px_30px_-12px_rgba(163,177,138,0.55)] hover:bg-[#e6e3da]",
    variant === "solid" && tone === "light" && "bg-hunter text-paper hover:bg-brunswick",
    variant === "ghost" && tone === "dark" && "text-bone ring-1 ring-white/15 hover:bg-white/[0.06]",
    variant === "ghost" && tone === "light" && "text-ink ring-1 ring-ink/15 hover:bg-ink/[0.04]",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <span
        className={clsx(
          "flex size-9 items-center justify-center rounded-full transition-transform duration-500 ease-drawer",
          "group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
          variant === "solid" && tone === "dark" && "bg-abyss/10",
          variant === "solid" && tone === "light" && "bg-white/12",
          variant === "ghost" && tone === "dark" && "bg-white/[0.08]",
          variant === "ghost" && tone === "light" && "bg-ink/[0.06]",
        )}
      >
        {icon}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

/** Renders **bold** segments from data strings. */
export function RichText({ text, strongClassName }: { text: string; strongClassName?: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={clsx("font-semibold", strongClassName)}>
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Counts the numeric part of a value ("9+", "−60%", "425 h") up when it scrolls into view. */
export function Counter({ value, className, delay = 0 }: { value: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const controls = animate(0, target, {
      duration: 1.6,
      delay,
      ease: easeOutExpo,
      onUpdate: (v) => setDisplay(`${match[1]}${v.toFixed(decimals)}${match[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={clsx("tabular-nums", className)}>
      {display}
    </span>
  );
}

export function Kbd({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <kbd
      className={clsx(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 font-mono text-[10.5px] font-medium",
        tone === "light" ? "bg-ink/[0.06] text-muted ring-1 ring-ink/10" : "bg-white/10 text-bone/80 ring-1 ring-white/10",
      )}
    >
      {children}
    </kbd>
  );
}

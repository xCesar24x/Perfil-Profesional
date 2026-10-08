"use client";

import { ArrowDown, ArrowUpRight, DownloadSimple, MapPin } from "@phosphor-icons/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { certifications } from "@/data/certifications";
import { countries, profile } from "@/data/profile";
import { roles } from "@/data/roles";
import { easeOutExpo } from "@/lib/motion";
import { useStore } from "@/lib/store";
import { Bezel, Counter, Eyebrow, IslandButton } from "@/components/ui/primitives";

const companies = new Set(roles.map((r) => r.company)).size;
const current = roles.filter((r) => r.end === null);

/** Nine flowing lines, one per role, drawn in on load. */
function TrajectoryLines() {
  const paths = Array.from({ length: 9 }, (_, i) => {
    const y = 120 + i * 46;
    const lift = 70 + i * 22;
    return `M -40 ${y + 260} C 260 ${y + 220}, 420 ${y + 40}, 680 ${y - lift * 0.35} S 1100 ${y - lift}, 1480 ${y - lift * 1.6}`;
  });
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="traj" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#a3b18a" stopOpacity="0" />
          <stop offset="0.45" stopColor="#a3b18a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#dad7cd" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          fill="none"
          stroke="url(#traj)"
          strokeWidth={i === 0 ? 1.4 : 0.8}
          className="enter-draw"
          style={delay(0.4 + i * 0.09)}
        />
      ))}
    </svg>
  );
}

function MaskLine({ children, delay: seconds }: { children: ReactNode; delay: number }) {
  return (
    // The tight 0.88 leading pushes descenders (g) and accents outside the line
    // box, so the mask gets extra room that the negative margins cancel out.
    <span className="-mt-[0.12em] -mb-[0.16em] block overflow-hidden pt-[0.12em] pb-[0.24em]">
      <span className="enter-mask block" style={delay(seconds)}>
        {children}
      </span>
    </span>
  );
}

const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero() {
  const { t, l, lang, focusRole, scrollToSection } = useStore();

  const stats = [
    { value: "9+", label: t.hero.stats.years },
    { value: String(countries.length), label: t.hero.stats.countries },
    { value: String(companies), label: t.hero.stats.companies },
    { value: String(certifications.length), label: t.hero.stats.certifications },
  ];

  return (
    <section
      id="profile"
      data-tone="dark"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-brunswick text-bone"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_85%_10%,rgba(88,129,87,0.55),transparent_60%),radial-gradient(60%_50%_at_0%_100%,rgba(29,44,36,0.9),transparent_70%),linear-gradient(180deg,#344e41_0%,#2b4337_55%,#273b31_100%)]"
      />
      <TrajectoryLines />

      <div className="container-page relative flex flex-1 flex-col justify-center pt-28 pb-20 lg:pt-32">
        <div className="grid grid-cols-1 items-end gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="enter-rise" style={delay(0.15)}>
              <Eyebrow tone="dark">{t.hero.eyebrow}</Eyebrow>
            </div>

            <h1 className="mt-7 font-display text-[clamp(3.2rem,8.4vw,8rem)] leading-[0.88] tracking-[-0.035em]">
              <MaskLine delay={0.25}>{profile.nameLines[0]}</MaskLine>
              <MaskLine delay={0.36}>
                <em className="text-sage italic">{profile.nameLines[1]}</em>
              </MaskLine>
            </h1>

            <p style={delay(0.55)} className="enter-rise mt-6 font-mono text-[11.5px] tracking-[0.14em] text-bone/60 uppercase">
              {l(profile.headline)}
            </p>

            <p style={delay(0.65)} className="enter-rise mt-6 max-w-2xl font-display text-[clamp(1.6rem,2.8vw,2.35rem)] leading-[1.12] tracking-[-0.01em] text-balance"
            >
              {l(profile.statement.lead)} — <em className="text-sage italic">{l(profile.statement.accent)}</em>
            </p>

            <p style={delay(0.75)} className="enter-rise mt-5 max-w-xl text-[15.5px] leading-relaxed text-bone/70 text-pretty">
              {l(profile.intro)}
            </p>

            <div style={delay(0.85)} className="enter-rise mt-8 flex flex-wrap items-center gap-3">
              <IslandButton
                tone="dark"
                onClick={() => scrollToSection("experience")}
                icon={<ArrowDown size={16} weight="regular" />}
              >
                {t.hero.explore}
              </IslandButton>
              <IslandButton
                tone="dark"
                variant="ghost"
                href={profile.cv[lang]}
                download
                icon={<DownloadSimple size={16} weight="regular" />}
              >
                {t.hero.downloadCv}
              </IslandButton>
            </div>
          </div>

          <div className="enter-card lg:col-span-5" style={delay(0.6)}>
            <Bezel tone="dark" innerClassName="p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-sage uppercase">
                  <span className="relative flex size-2">
                    <span className="size-2 animate-pulse-dot rounded-full bg-sage" />
                  </span>
                  {t.hero.currently}
                </span>
                <span className="flex items-center gap-1.5 text-[12.5px] text-bone/55">
                  <MapPin size={14} weight="light" />
                  {l(profile.location)}
                </span>
              </div>

              <ul className="mt-5 space-y-2">
                {current.map((role) => (
                  <li key={role.id}>
                    <button
                      type="button"
                      onClick={() => focusRole(role.id)}
                      className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-white/[0.035] px-4 py-3.5 text-left ring-1 ring-white/[0.06] transition-[background-color,transform] duration-500 ease-drawer hover:bg-white/[0.07] active:scale-[0.99]"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[15px] font-medium text-bone">{l(role.title)}</span>
                        <span className="mt-0.5 block text-[13px] text-bone/55">{role.company}</span>
                      </span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-bone/70 transition-transform duration-500 ease-drawer group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:text-bone">
                        <ArrowUpRight size={15} weight="light" />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.07] ring-1 ring-white/[0.06]">
                {stats.map((s, i) => (
                  <div key={s.label} className="bg-deep px-4 py-5 sm:px-5">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <Counter
                        value={s.value}
                        delay={0.9 + i * 0.08}
                        className="block font-display text-[2.9rem] leading-none tracking-[-0.03em] text-bone"
                      />
                      <span className="mt-2 block text-[12.5px] leading-snug text-bone/55">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <p className="font-mono text-[10.5px] tracking-[0.2em] text-bone/45 uppercase">{t.hero.openTo}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {profile.openTo.map((item) => (
                    <li
                      key={item.en}
                      className="rounded-full bg-sage/[0.12] px-3 py-1 text-[12px] text-sage-soft ring-1 ring-sage/20"
                    >
                      {l(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </Bezel>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("impact")}
        style={delay(1.6)}
        className="enter-rise absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-bone/45 transition-colors hover:text-bone/80 md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">{t.hero.scroll}</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-sage"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, ease: easeOutExpo, repeat: Infinity, repeatDelay: 0.4 }}
          />
        </span>
      </button>
    </section>
  );
}

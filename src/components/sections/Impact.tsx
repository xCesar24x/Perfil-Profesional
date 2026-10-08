"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { countries, impact } from "@/data/profile";
import { roleById } from "@/data/roles";
import { easeOutExpo } from "@/lib/motion";
import { useStore } from "@/lib/store";
import { Bezel, Counter, Reveal, SectionHeading, type Tone } from "@/components/ui/primitives";

type ImpactItem = (typeof impact)[number];

function CardFooter({ roleId, tone }: { roleId: string; tone: Tone }) {
  const { t, l } = useStore();
  const role = roleById.get(roleId)!;
  return (
    <div
      className={clsx(
        "mt-auto flex items-center justify-between gap-4 border-t pt-4",
        tone === "dark" ? "border-white/[0.08]" : "border-ink/[0.07]",
      )}
    >
      <span className="min-w-0">
        <span className={clsx("block truncate text-[13px] font-medium", tone === "dark" ? "text-bone" : "text-ink")}>
          {role.company}
        </span>
        <span className={clsx("block truncate text-[12px]", tone === "dark" ? "text-bone/60" : "text-muted")}>
          {l(role.title)}
        </span>
      </span>
      <span
        className={clsx(
          "flex shrink-0 items-center gap-2 text-[12px] font-medium transition-colors duration-300",
          tone === "dark" ? "text-sage group-hover:text-bone" : "text-fern group-hover:text-hunter",
        )}
      >
        <span className="hidden sm:inline">{t.impact.viewRole}</span>
        <span
          className={clsx(
            "flex size-8 items-center justify-center rounded-full transition-transform duration-500 ease-drawer group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
            tone === "dark" ? "bg-white/[0.08]" : "bg-fern/10",
          )}
        >
          <ArrowUpRight size={15} weight="light" />
        </span>
      </span>
    </div>
  );
}

function ImpactCard({ item, className, delay }: { item: ImpactItem; className?: string; delay: number }) {
  const { l, focusRole } = useStore();
  return (
    <Reveal delay={delay} className={className}>
      <button
        type="button"
        onClick={() => focusRole(item.roleId)}
        className="group block h-full w-full text-left transition-transform duration-700 ease-drawer hover:-translate-y-1 active:scale-[0.99]"
      >
        <Bezel innerClassName="flex h-full flex-col p-6 sm:p-7" className="h-full">
          <Counter
            value={item.value}
            className="font-display text-[clamp(3rem,5vw,4.25rem)] leading-none tracking-[-0.035em] text-brass-deep"
          />
          <p className="mt-3 text-[15px] font-medium text-ink">{l(item.label)}</p>
          <p className="mt-1.5 mb-6 text-[13.5px] leading-relaxed text-muted text-pretty">{l(item.context)}</p>
          <CardFooter roleId={item.roleId} tone="light" />
        </Bezel>
      </button>
    </Reveal>
  );
}

function FeatureCard({ item }: { item: ImpactItem }) {
  const { l, focusRole } = useStore();
  const role = roleById.get(item.roleId)!;
  const bars = role.metrics.filter((m) => m.value.startsWith("+"));

  return (
    <Reveal className="lg:col-span-7 lg:row-span-2">
      <button
        type="button"
        onClick={() => focusRole(item.roleId)}
        className="group block h-full w-full text-left transition-transform duration-700 ease-drawer hover:-translate-y-1 active:scale-[0.995]"
        data-tone="dark"
      >
        <Bezel
          tone="dark"
          className="h-full bg-brunswick/90"
          innerClassName="relative flex h-full flex-col overflow-hidden bg-[radial-gradient(90%_70%_at_100%_0%,rgba(88,129,87,0.45),transparent_60%)] p-7 sm:p-9"
        >
          <Counter
            value={item.value}
            className="font-display text-[clamp(5rem,11vw,9.5rem)] leading-[0.85] tracking-[-0.045em] text-brass-light"
          />
          <p className="mt-4 text-[17px] font-medium text-bone">{l(item.label)}</p>
          <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-bone/60">{l(item.context)}</p>

          <div className="my-10 space-y-5">
            {bars.map((m, i) => {
              const pct = parseInt(m.value.replace(/\D/g, ""), 10);
              return (
                <div key={m.label.en}>
                  <div className="mb-2 flex items-baseline justify-between text-[13px]">
                    <span className="text-bone/70">{l(m.label)}</span>
                    <span className="font-mono text-brass-light">{m.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      className="h-full origin-left rounded-full bg-gradient-to-r from-brass/70 to-brass-light"
                      style={{ width: `${(pct / 35) * 100}%` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.3 + i * 0.12 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <CardFooter roleId={item.roleId} tone="dark" />
        </Bezel>
      </button>
    </Reveal>
  );
}

function CountriesCard() {
  const { t, l, scrollToSection } = useStore();
  return (
    <Reveal delay={0.1} className="lg:col-span-8">
      <button
        type="button"
        onClick={() => scrollToSection("experience")}
        className="group block h-full w-full text-left transition-transform duration-700 ease-drawer hover:-translate-y-1"
      >
        <Bezel className="h-full" innerClassName="flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-10 sm:p-7">
          <div className="shrink-0">
            <Counter
              value={String(countries.length)}
              className="font-display text-[clamp(3rem,5vw,4.25rem)] leading-none tracking-[-0.035em] text-brass-deep"
            />
            <p className="mt-3 text-[15px] font-medium text-ink">{t.impact.countriesTitle}</p>
            <p className="mt-1 max-w-[14rem] text-[13.5px] leading-relaxed text-muted">{t.impact.countriesLabel}</p>
          </div>
          <ul className="grid flex-1 grid-cols-2 gap-1.5 sm:grid-cols-3 xl:grid-cols-4">
            {countries.map((c, i) => (
              <motion.li
                key={c.code}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-2.5 rounded-xl bg-ink/[0.035] px-3 py-2.5 ring-1 ring-ink/[0.05]"
              >
                <span className="font-mono text-[11px] font-medium tracking-wider text-fern">{c.code}</span>
                <span className="truncate text-[13px] text-ink">{l(c.name)}</span>
              </motion.li>
            ))}
          </ul>
        </Bezel>
      </button>
    </Reveal>
  );
}

export function Impact() {
  const { t } = useStore();
  const [feature, ...rest] = impact;
  const [manual, accuracy, hours, models, solutions, collector] = rest;

  return (
    <section id="impact" className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.impact.eyebrow}
          title={t.impact.title}
          accent={t.impact.titleAccent}
          intro={t.impact.intro}
        />

        <div className="mt-16 grid grid-cols-1 gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          <FeatureCard item={feature} />
          <ImpactCard item={manual} className="lg:col-span-5" delay={0.08} />
          <ImpactCard item={accuracy} className="lg:col-span-5" delay={0.16} />
          <ImpactCard item={hours} className="lg:col-span-4" delay={0} />
          <ImpactCard item={models} className="lg:col-span-4" delay={0.08} />
          <ImpactCard item={solutions} className="lg:col-span-4" delay={0.16} />
          <CountriesCard />
          <ImpactCard item={collector} className="lg:col-span-4" delay={0.18} />
        </div>
      </div>
    </section>
  );
}

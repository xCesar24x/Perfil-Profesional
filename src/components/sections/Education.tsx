"use client";

import { GraduationCap, Translate } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { education, languages, profile } from "@/data/profile";
import { easeOutExpo } from "@/lib/motion";
import { useStore } from "@/lib/store";
import { Bezel, Reveal, SectionHeading } from "@/components/ui/primitives";

const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export function Education() {
  const { t, l } = useStore();

  return (
    <section id="education" className="relative bg-paper-2/60 py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} accent={t.education.titleAccent} />

        <div className="mt-16 grid grid-cols-1 gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          <div className="grid grid-cols-1 gap-4 lg:col-span-7 lg:gap-5">
            {education.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.08}>
                <Bezel innerClassName="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-7">
                  <span
                    className={clsx(
                      "flex size-12 shrink-0 items-center justify-center rounded-full",
                      e.inProgress ? "bg-hunter text-bone" : "bg-ink/[0.05] text-hunter",
                    )}
                  >
                    <GraduationCap size={22} weight="light" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11.5px] tracking-wide text-hunter">
                        {e.start} — {e.end}
                      </span>
                      {e.inProgress && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-fern/10 px-2 py-0.5 text-[11px] font-medium text-hunter">
                          <span className="size-1.5 animate-pulse-dot rounded-full bg-fern" />
                          {t.education.inProgress}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.015em] text-ink text-balance">
                      {l(e.degree)}
                    </h3>
                    <p className="mt-2 text-[14px] text-muted">
                      {e.institution} · {l(e.detail)}
                    </p>
                  </div>
                </Bezel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <Bezel tone="dark" className="h-full bg-brunswick/90" innerClassName="flex h-full flex-col p-6 sm:p-8" data-tone="dark">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-white/[0.07] text-sage">
                  <Translate size={20} weight="light" />
                </span>
                <p className="font-mono text-[11px] tracking-[0.2em] text-sage uppercase">{t.education.languages}</p>
              </div>

              <ul className="mt-8 mb-10 space-y-9">
                {languages.map((lang, li) => {
                  const level = lang.cefr === "native" ? CEFR.length : CEFR.indexOf(lang.cefr) + 1;
                  return (
                    <li key={lang.name.en}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-[2.4rem] leading-none text-bone">{l(lang.name)}</span>
                        <span className="text-[13px] text-bone/60">{l(lang.level)}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-6 gap-1.5">
                        {CEFR.map((c, i) => (
                          <div key={c}>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                              {i < level && (
                                <motion.div
                                  className="h-full origin-left rounded-full bg-gradient-to-r from-fern to-sage"
                                  initial={{ scaleX: 0 }}
                                  whileInView={{ scaleX: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 + li * 0.2 + i * 0.07 }}
                                />
                              )}
                            </div>
                            <span
                              className={clsx(
                                "mt-2 block text-center font-mono text-[10px]",
                                i < level ? "text-bone/70" : "text-bone/30",
                              )}
                            >
                              {c}
                            </span>
                          </div>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto border-t border-white/[0.08] pt-6 lg:mt-12">
                <p className="font-mono text-[10.5px] tracking-[0.2em] text-bone/45 uppercase">
                  {t.education.availability}
                </p>
                <p className="mt-2 font-display text-[1.65rem] leading-tight text-bone">{l(profile.availability)}</p>
                <p className="mt-1 text-[13px] text-bone/55">{l(profile.location)}</p>
              </div>
            </Bezel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

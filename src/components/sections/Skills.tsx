"use client";

import { ArrowUpRight, Certificate, MagnifyingGlass, X } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { skillById, skillCategories, skills } from "@/data/skills";
import type { SkillCategoryId } from "@/data/types";
import { formatRange } from "@/lib/dates";
import { getSkillEvidence, matches } from "@/lib/evidence";
import { easeOutExpo, springSnappy } from "@/lib/motion";
import { useNow } from "@/lib/now";
import { useStore } from "@/lib/store";
import { Bezel, Reveal, SectionHeading } from "@/components/ui/primitives";

function formatYears(months: number, lang: "es" | "en") {
  const years = months / 12;
  if (years < 1) return lang === "es" ? `${months} meses` : `${months} mos`;
  const rounded = Math.round(years * 2) / 2;
  const n = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return lang === "es" ? `${n} ${rounded === 1 ? "año" : "años"}` : `${n} ${rounded === 1 ? "yr" : "yrs"}`;
}

function SkillDetail() {
  const { t, l, lang, selectedSkill, focusRole, focusCert, flash } = useStore();
  const now = useNow();
  const skill = skillById.get(selectedSkill)!;
  const evidence = getSkillEvidence(skill.id, now);
  const category = skillCategories.find((c) => c.id === skill.category)!;

  return (
    <Bezel
      id="skill-detail"
      tone="dark"
      className={clsx("scroll-mt-32", flash === "skill-detail" && "animate-flash")}
      innerClassName="relative overflow-hidden p-6 sm:p-8"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.18 } }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          aria-live="polite"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-sage-soft uppercase">{l(category.label)}</p>
          <h3 className="mt-3 font-display text-[clamp(2.2rem,3.4vw,3rem)] leading-none tracking-[-0.02em] text-bone">
            {l(skill.name)}
          </h3>
          <p className="mt-4 text-[14.5px] leading-relaxed text-bone/70 text-pretty">{l(skill.description)}</p>

          <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/[0.07] ring-1 ring-white/[0.06]">
            {[
              { k: t.skills.appliedIn, v: String(evidence.roles.length) },
              { k: t.skills.yearsUsed, v: evidence.months ? formatYears(evidence.months, lang) : "—" },
              { k: t.skills.backedBy, v: String(evidence.certs.length) },
            ].map((s) => (
              <div key={s.k} className="bg-abyss/60 px-3 py-3.5">
                <dd className="font-display text-[1.6rem] leading-none text-brass-light">{s.v}</dd>
                <dt className="mt-1.5 text-[11px] leading-tight text-bone/60">{s.k}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <p className="font-mono text-[11px] tracking-[0.2em] text-bone/60 uppercase">
              {t.skills.appliedIn} · {t.skills.roleCount(evidence.roles.length)}
            </p>
            {evidence.roles.length ? (
              <ul className="mt-3 space-y-1.5">
                {evidence.roles.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => focusRole(r.id)}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl bg-white/[0.035] px-3.5 py-2.5 text-left ring-1 ring-white/[0.05] transition-colors duration-300 hover:bg-white/[0.08]"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[13.5px] text-bone">{l(r.title)}</span>
                        <span className="block truncate text-[12px] text-bone/60">
                          {r.company} · {formatRange(r.start, r.end, t)}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        weight="light"
                        className="shrink-0 text-bone/40 transition-transform duration-500 ease-drawer group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:text-sage"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[13px] text-bone/65">{t.skills.noRoles}</p>
            )}
          </div>

          <div className="mt-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-bone/60 uppercase">
              {t.skills.backedBy} · {t.skills.certCount(evidence.certs.length)}
            </p>
            {evidence.certs.length ? (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {evidence.certs.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => focusCert(c.id)}
                      className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-sage/[0.1] px-3 py-1.5 text-left text-[12px] text-sage-soft ring-1 ring-sage/20 transition-colors duration-300 hover:bg-sage/20 hover:text-bone"
                    >
                      <Certificate size={13} weight="light" className="shrink-0" />
                      <span className="truncate">{l(c.name)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[13px] text-bone/65">{t.skills.noCerts}</p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </Bezel>
  );
}

export function Skills() {
  const {
    t,
    l,
    skillCategory,
    setSkillCategory,
    selectedSkill,
    setSelectedSkill,
    skillQuery,
    setSkillQuery,
  } = useStore();
  const now = useNow();

  const evidenceCount = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of skills) {
      const e = getSkillEvidence(s.id, now);
      map.set(s.id, e.roles.length + e.certs.length);
    }
    return map;
  }, [now]);

  const visible = skills.filter(
    (s) =>
      (skillCategory === "all" || s.category === skillCategory) &&
      matches(skillQuery, s.name.es, s.name.en, s.description.es, s.description.en),
  );

  const categories: { id: SkillCategoryId | "all"; label: string; count: number }[] = [
    { id: "all", label: t.skills.all, count: skills.length },
    ...skillCategories.map((c) => ({
      id: c.id,
      label: l(c.label),
      count: skills.filter((s) => s.category === c.id).length,
    })),
  ];
  const activeCategory = skillCategories.find((c) => c.id === skillCategory);

  const select = (id: string) => {
    setSelectedSkill(id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() =>
        document.getElementById("skill-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  };

  return (
    <section
      id="skills"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-brunswick py-24 text-bone sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_0%_0%,rgba(88,129,87,0.4),transparent_60%),radial-gradient(60%_60%_at_100%_100%,rgba(29,44,36,0.85),transparent_70%)]"
      />
      <div className="container-page">
        <SectionHeading
          tone="dark"
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          accent={t.skills.titleAccent}
          intro={t.skills.intro}
        />

        <div id="skills-explorer" className="mt-16 grid scroll-mt-28 grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
          {/* Categories */}
          <Reveal className="lg:col-span-3">
            <label className="relative block">
              <span className="sr-only">{t.skills.search}</span>
              <MagnifyingGlass
                size={16}
                weight="light"
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-bone/60"
              />
              <input
                type="search"
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
                placeholder={t.skills.search}
                className="w-full rounded-full bg-white/[0.05] py-3 pr-10 pl-11 text-[14px] text-bone ring-1 ring-white/10 transition-shadow duration-300 outline-none placeholder:text-bone/55 focus:ring-sage/50"
              />
              {skillQuery && (
                <button
                  type="button"
                  onClick={() => setSkillQuery("")}
                  aria-label="Clear"
                  className="absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-bone/60 hover:bg-white/10 hover:text-bone"
                >
                  <X size={12} weight="bold" />
                </button>
              )}
            </label>

            <ul className="mt-4 flex gap-1 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible">
              {categories.map((c) => (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setSkillCategory(c.id)}
                    aria-pressed={skillCategory === c.id}
                    className={clsx(
                      "relative isolate flex w-full items-center justify-between gap-4 rounded-full px-4 py-2.5 text-left text-[13.5px] whitespace-nowrap transition-colors duration-300 lg:rounded-xl",
                      skillCategory === c.id ? "text-abyss" : "text-bone/65 hover:text-bone",
                    )}
                  >
                    {skillCategory === c.id && (
                      <motion.span
                        layoutId="skill-category"
                        transition={springSnappy}
                        className="absolute inset-0 -z-10 rounded-full bg-bone lg:rounded-xl"
                      />
                    )}
                    <span className="font-medium">{c.label}</span>
                    <span
                      className={clsx(
                        "font-mono text-[11px]",
                        skillCategory === c.id ? "text-abyss/55" : "text-bone/45",
                      )}
                    >
                      {String(c.count).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Skill cloud */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activeCategory?.id ?? "all"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                transition={{ duration: 0.45, ease: easeOutExpo }}
                className="min-h-[2.75rem] text-[14px] leading-relaxed text-bone/60"
              >
                {activeCategory ? l(activeCategory.blurb) : t.skills.allBlurb}
              </motion.p>
            </AnimatePresence>

            <ul className="mt-5 flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((s) => {
                  const active = selectedSkill === s.id;
                  return (
                    <motion.li
                      key={s.id}
                      layout="position"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                      transition={springSnappy}
                    >
                      <button
                        type="button"
                        onClick={() => select(s.id)}
                        aria-pressed={active}
                        className={clsx(
                          "relative isolate flex items-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] transition-[color,box-shadow,background-color] duration-300 active:scale-[0.97]",
                          active
                            ? "text-abyss"
                            : "bg-white/[0.04] text-bone/85 ring-1 ring-white/[0.08] hover:bg-white/[0.08] hover:text-bone",
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="skill-active"
                            transition={springSnappy}
                            className="absolute inset-0 -z-10 rounded-full bg-sage shadow-[0_8px_24px_-10px_rgba(163,177,138,0.7)]"
                          />
                        )}
                        {l(s.name)}
                        {s.core && (
                          <span
                            title={t.skills.core}
                            className={clsx("size-1.5 rounded-full", active ? "bg-abyss/50" : "bg-sage")}
                          />
                        )}
                        <span
                          className={clsx(
                            "font-mono text-[10.5px]",
                            active ? "text-abyss/55" : "text-bone/45",
                          )}
                        >
                          {evidenceCount.get(s.id)}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            {visible.length === 0 && <p className="mt-6 text-[14px] text-bone/65">{t.skills.empty}</p>}

            <p className="mt-8 flex items-center gap-2 text-[12px] text-bone/60">
              <span className="size-1.5 rounded-full bg-sage" /> {t.skills.core}
              <span className="mx-2 text-bone/20">·</span>
              <span className="font-mono">n</span> = {t.skills.appliedIn.toLowerCase()} + {t.skills.backedBy.toLowerCase()}
            </p>
          </Reveal>

          {/* Evidence panel */}
          <Reveal delay={0.16} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SkillDetail />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

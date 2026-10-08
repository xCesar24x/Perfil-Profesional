"use client";

import { ArrowUpRight, CaretDown, Plus, TrendUp } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { chapters, roleById } from "@/data/roles";
import { skillById } from "@/data/skills";
import type { Role } from "@/data/types";
import { formatDuration, formatRange, monthsBetween } from "@/lib/dates";
import { easeDrawer, easeOutExpo } from "@/lib/motion";
import { useNow } from "@/lib/now";
import { useStore } from "@/lib/store";
import { Bezel, RichText } from "@/components/ui/primitives";
import { chapterColor } from "./CareerTimeline";

const panel = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: { height: { duration: 0.7, ease: easeDrawer }, opacity: { duration: 0.5, delay: 0.1 } },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.55, ease: easeDrawer }, opacity: { duration: 0.25 } },
  },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};

const rise = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

function ScopeDetail({ role }: { role: Role }) {
  const { t, l } = useStore();
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-ink/[0.035] px-4 py-3.5 text-left ring-1 ring-ink/[0.05] transition-colors duration-300 hover:bg-ink/[0.06]"
      >
        <span className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.18em] text-hunter uppercase">{t.experience.scope}</span>
          <span className="text-[13px] text-muted">{open ? t.experience.scopeHide : t.experience.scopeShow}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.5, ease: easeDrawer }}
          className="flex size-7 items-center justify-center rounded-full bg-paper text-hunter ring-1 ring-ink/[0.08]"
        >
          <CaretDown size={13} weight="bold" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} key="scope" {...panel} className="overflow-hidden">
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2"
            >
              {role.scope.map((group) => (
                <motion.div
                  key={group.title.en}
                  variants={rise}
                  className="rounded-2xl bg-paper/70 p-4 ring-1 ring-ink/[0.05]"
                >
                  <p className="text-[13.5px] font-semibold text-ink">{l(group.title)}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item.en} className="flex gap-2.5 text-[13.5px] leading-snug text-muted">
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-sage" />
                        {l(item)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RoleCard({ role }: { role: Role }) {
  const { t, l, openRoles, toggleRole, focusSkill, focusRole, flash } = useStore();
  const now = useNow();
  const open = openRoles.has(role.id);
  const panelId = useId();
  const chapter = chapters.find((c) => c.id === role.chapter)!;
  const promotedFrom = role.promotedFrom ? roleById.get(role.promotedFrom) : undefined;
  const months = monthsBetween(role.start, role.end, now);

  return (
    <article id={`role-${role.id}`} className="relative scroll-mt-40 pl-8 sm:pl-12">
      {/* Rail node */}
      <span
        aria-hidden
        className={clsx(
          "absolute top-9 left-[7px] size-[11px] rounded-full ring-4 ring-paper sm:left-[19px]",
          role.end === null ? "animate-pulse-dot bg-fern" : open ? "bg-hunter" : "bg-sage",
        )}
      />

      <Bezel
        className={clsx(
          "role-card transition-shadow duration-500",
          flash === `role-${role.id}` && "animate-flash",
          open && "ring-ink/[0.09]",
        )}
        innerClassName="overflow-hidden"
      >
        <button
          type="button"
          onClick={() => toggleRole(role.id)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? t.experience.close : t.experience.open}: ${l(role.title)} · ${role.company}`}
          className="group grid grid-cols-1 w-full gap-x-8 gap-y-3 p-5 text-left sm:p-7 md:grid-cols-[11rem_1fr_auto] md:items-start"
        >
          <div className="flex items-center gap-3 pr-12 sm:pr-0 md:block">
            <p className="font-mono text-[11.5px] tracking-wide text-hunter uppercase">
              {formatRange(role.start, role.end, t)}
            </p>
            <p className="text-[12.5px] text-muted md:mt-1.5">{formatDuration(months, t)}</p>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="text-[13px] font-semibold tracking-[-0.005em] text-fern">{role.company}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.04] px-2 py-0.5 text-[11px] text-muted">
                <span className={clsx("size-1.5 rounded-full", chapterColor[role.chapter])} />
                {l(chapter.label)}
              </span>
              {promotedFrom && (
                <span className="inline-flex items-center gap-1 rounded-full bg-fern/10 px-2 py-0.5 text-[11px] font-medium text-hunter">
                  <TrendUp size={12} weight="bold" />
                  {t.experience.promoted}
                </span>
              )}
            </div>
            <h3 className="mt-2 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              {l(role.title)}
            </h3>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-muted text-pretty">{l(role.summary)}</p>

            <AnimatePresence initial={false}>
              {!open && role.metrics.length > 0 && (
                <motion.ul
                  key="chips"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: easeDrawer }}
                  className="flex flex-wrap gap-1.5 overflow-hidden"
                >
                  {role.metrics.slice(0, 3).map((m) => (
                    <li
                      key={m.label.en}
                      className="mt-4 rounded-full bg-paper px-3 py-1 text-[12px] text-ink ring-1 ring-ink/[0.07]"
                    >
                      <span className="font-semibold text-hunter">{m.value}</span> {l(m.label)}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <span
            className={clsx(
              "absolute top-5 right-5 flex size-10 items-center justify-center rounded-full transition-[background-color,color,transform] duration-500 ease-drawer group-active:scale-95 sm:static sm:top-auto sm:right-auto",
              open ? "bg-hunter text-paper" : "bg-ink/[0.05] text-ink group-hover:bg-ink/[0.09]",
            )}
          >
            <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.6, ease: easeDrawer }}>
              <Plus size={17} weight="light" />
            </motion.span>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div id={panelId} key="panel" {...panel} className="overflow-hidden">
              <motion.div
                variants={stagger}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 gap-10 border-t border-ink/[0.06] p-5 sm:p-7 md:grid-cols-[11rem_1fr] md:gap-x-8"
              >
                <motion.div variants={rise} className="hidden md:block">
                  {promotedFrom && (
                    <button
                      type="button"
                      onClick={() => focusRole(promotedFrom.id)}
                      className="group/p text-left text-[12.5px] leading-snug text-muted transition-colors hover:text-ink"
                    >
                      <span className="block font-mono text-[10.5px] tracking-[0.16em] text-hunter uppercase">
                        {t.experience.promotedFrom}
                      </span>
                      <span className="mt-1 block underline decoration-ink/20 underline-offset-4 group-hover/p:decoration-fern">
                        {l(promotedFrom.title)}
                      </span>
                    </button>
                  )}
                </motion.div>

                <div className="grid grid-cols-1 min-w-0 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <motion.p variants={rise} className="font-mono text-[11px] tracking-[0.18em] text-hunter uppercase">
                      {t.experience.highlights}
                    </motion.p>
                    <ul className="mt-4 space-y-3.5">
                      {role.highlights.map((h) => (
                        <motion.li
                          key={h.en}
                          variants={rise}
                          className="flex gap-3.5 text-[15px] leading-relaxed text-ink/85 text-pretty"
                        >
                          <span className="mt-[9px] h-px w-3.5 shrink-0 bg-fern" />
                          <span>
                            <RichText text={l(h)} strongClassName="text-ink" />
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    {role.scope.length > 0 && (
                      <motion.div variants={rise}>
                        <ScopeDetail role={role} />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-8 lg:col-span-5">
                    {role.metrics.length > 0 && (
                      <motion.div variants={rise}>
                        <p className="font-mono text-[11px] tracking-[0.18em] text-hunter uppercase">
                          {t.experience.metrics}
                        </p>
                        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/[0.07] ring-1 ring-ink/[0.06]">
                          {role.metrics.map((m) => (
                            <div key={m.label.en} className="bg-paper px-4 py-4">
                              <dt className="sr-only">{l(m.label)}</dt>
                              <dd>
                                <span className="block font-display text-[2rem] leading-none tracking-[-0.03em] text-hunter">
                                  {m.value}
                                </span>
                                <span className="mt-1.5 block text-[12px] leading-snug text-muted">{l(m.label)}</span>
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </motion.div>
                    )}

                    <motion.div variants={rise}>
                      <p className="font-mono text-[11px] tracking-[0.18em] text-hunter uppercase">{t.experience.context}</p>
                      <dl className="mt-4 divide-y divide-ink/[0.06] text-[13.5px]">
                        {[
                          [t.experience.industry, l(role.industry)],
                          [t.experience.location, l(role.location)],
                          [t.experience.markets, l(role.markets)],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-6 py-2.5">
                            <dt className="shrink-0 text-muted">{k}</dt>
                            <dd className="text-right text-ink">{v}</dd>
                          </div>
                        ))}
                        {role.companyNote && (
                          <div className="flex justify-between gap-6 py-2.5">
                            <dt className="shrink-0 text-muted">{role.company}</dt>
                            <dd className="text-right text-ink">{l(role.companyNote)}</dd>
                          </div>
                        )}
                      </dl>
                    </motion.div>

                    <motion.div variants={rise}>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-mono text-[11px] tracking-[0.18em] text-hunter uppercase">{t.experience.tools}</p>
                        <p className="hidden text-[11.5px] text-muted sm:block">{t.experience.toolsHint}</p>
                      </div>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {role.skills.map((id) => {
                          const skill = skillById.get(id);
                          if (!skill) return null;
                          return (
                            <li key={id}>
                              <button
                                type="button"
                                onClick={() => focusSkill(id)}
                                className="group/s inline-flex items-center gap-1 rounded-full bg-paper px-3 py-1.5 text-[12.5px] text-ink ring-1 ring-ink/[0.08] transition-[background-color,color,box-shadow] duration-300 hover:bg-hunter hover:text-paper hover:ring-hunter"
                              >
                                {l(skill.name)}
                                <ArrowUpRight
                                  size={11}
                                  weight="bold"
                                  className="-mr-0.5 opacity-0 transition-opacity duration-300 group-hover/s:opacity-100"
                                />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Bezel>
    </article>
  );
}

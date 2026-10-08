"use client";

import { ArrowUpRight, MagnifyingGlass, Plus, SealCheck, Star, X } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { certCategories, certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
import { skillById } from "@/data/skills";
import type { Certification, Issuer } from "@/data/types";
import { formatYM } from "@/lib/dates";
import { matches } from "@/lib/evidence";
import { easeDrawer, easeOutExpo, springSnappy } from "@/lib/motion";
import { useStore } from "@/lib/store";
import { Bezel, Counter, Reveal, SectionHeading } from "@/components/ui/primitives";

const issuers: Issuer[] = ["LinkedIn Learning", "Genpact", "Udemy"];
const issuerMark: Record<Issuer, string> = { "LinkedIn Learning": "in", Genpact: "G", Udemy: "U" };

const byYear = Object.entries(
  certifications.reduce<Record<string, number>>((acc, c) => {
    const y = c.issued.slice(0, 4);
    acc[y] = (acc[y] ?? 0) + 1;
    return acc;
  }, {}),
).sort(([a], [b]) => Number(a) - Number(b));
const maxPerYear = Math.max(...byYear.map(([, n]) => n));

function IssuerMark({ issuer, size = "md" }: { issuer: Issuer; size?: "md" | "lg" }) {
  return (
    <span
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full font-display italic",
        size === "md" ? "size-9 text-[15px]" : "size-12 text-[20px]",
        issuer === "Genpact" ? "bg-hunter text-paper" : issuer === "Udemy" ? "bg-sage/40 text-hunter" : "bg-fern/15 text-fern",
      )}
    >
      {issuerMark[issuer]}
    </span>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const { t, l, openCert, setOpenCert, focusSkill, flash } = useStore();
  const open = openCert === cert.id;
  const category = certCategories.find((c) => c.id === cert.category)!;

  return (
    <motion.li
      id={`cert-${cert.id}`}
      layout="position"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ layout: { duration: 0.55, ease: easeDrawer }, default: { duration: 0.5, ease: easeOutExpo } }}
      className="scroll-mt-40"
    >
      <Bezel
        className={clsx("h-full transition-shadow duration-500", flash === `cert-${cert.id}` && "animate-flash")}
        innerClassName="overflow-hidden"
      >
        <button
          type="button"
          onClick={() => setOpenCert(open ? null : cert.id)}
          aria-expanded={open}
          className="group flex w-full items-start gap-4 p-5 text-left"
        >
          <IssuerMark issuer={cert.issuer} />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">{l(category.label)}</span>
              {cert.path && (
                <span className="rounded-full bg-fern/10 px-2 py-0.5 text-[10.5px] font-medium text-hunter">
                  {t.certs.path}
                </span>
              )}
              {cert.featured && <Star size={12} weight="fill" className="text-fern" aria-label={t.certs.featured} />}
            </span>
            <span className="mt-1.5 block text-[15px] leading-snug font-medium text-ink text-pretty">{l(cert.name)}</span>
            <span className="mt-1 block text-[12.5px] text-muted">
              {cert.issuer} · {formatYM(cert.issued, t)}
            </span>
          </span>
          <motion.span
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ duration: 0.5, ease: easeDrawer }}
            className={clsx(
              "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              open ? "bg-hunter text-paper" : "bg-ink/[0.05] text-ink group-hover:bg-ink/[0.09]",
            )}
          >
            <Plus size={14} weight="light" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: easeDrawer }}
              className="overflow-hidden"
            >
              <div className="space-y-4 border-t border-ink/[0.06] px-5 pt-4 pb-5">
                <div>
                  <p className="font-mono text-[10.5px] tracking-[0.16em] text-hunter uppercase">{t.certs.validates}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {cert.skills.map((id) => {
                      const skill = skillById.get(id);
                      if (!skill) return null;
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            onClick={() => focusSkill(id)}
                            className="rounded-full bg-paper px-2.5 py-1 text-[12px] text-ink ring-1 ring-ink/[0.08] transition-colors duration-300 hover:bg-hunter hover:text-paper hover:ring-hunter"
                          >
                            {l(skill.name)}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {cert.credentialId ? (
                    <span className="text-[12px] text-muted">
                      {t.certs.credential}: <span className="font-mono text-ink">{cert.credentialId}</span>
                    </span>
                  ) : (
                    <span className="text-[12px] text-muted">
                      {t.certs.issued} {formatYM(cert.issued, t)}
                    </span>
                  )}
                  <a
                    href={cert.url ?? profile.linkedinCerts}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-[12.5px] font-medium text-fern hover:text-hunter"
                  >
                    {cert.url ? t.certs.viewCredential : t.certs.verify}
                    <ArrowUpRight
                      size={13}
                      weight="bold"
                      className="transition-transform duration-500 ease-drawer group-hover/link:translate-x-0.5 group-hover/link:-translate-y-px"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Bezel>
    </motion.li>
  );
}

function FeaturedCredential({ cert, delay }: { cert: Certification; delay: number }) {
  const { l, t, focusCert } = useStore();
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={() => focusCert(cert.id)}
        className="group block h-full w-full text-left transition-transform duration-700 ease-drawer hover:-translate-y-1"
      >
        <Bezel className="h-full" innerClassName="flex h-full flex-col p-6">
          <div className="flex items-start justify-between">
            <span className="flex size-12 items-center justify-center rounded-full bg-hunter text-bone">
              <SealCheck size={24} weight="light" />
            </span>
            <span className="font-mono text-[11px] text-muted">{formatYM(cert.issued, t)}</span>
          </div>
          <p className="mt-6 font-display text-[1.75rem] leading-[1.05] tracking-[-0.015em] text-ink sm:mt-auto sm:pt-10">
            {l(cert.name)}
          </p>
          <p className="mt-2 text-[13px] text-muted">{cert.issuer}</p>
          <p className="mt-5 border-t border-ink/[0.07] pt-4 text-[12.5px] leading-relaxed text-muted">
            <span className="font-mono text-[10px] tracking-[0.16em] text-hunter uppercase">{t.certs.validates}</span>
            <br />
            {cert.skills
              .map((id) => skillById.get(id))
              .filter((s) => s !== undefined)
              .map((s) => l(s.name))
              .join(" · ")}
          </p>
        </Bezel>
      </button>
    </Reveal>
  );
}

export function Certifications() {
  const {
    t,
    l,
    certCategory,
    setCertCategory,
    certIssuer,
    setCertIssuer,
    certQuery,
    setCertQuery,
  } = useStore();

  const featured = certifications.filter((c) => c.featured && c.category === "process");
  const visible = certifications
    .filter(
      (c) =>
        (certCategory === "all" || c.category === certCategory) &&
        (certIssuer === "all" || c.issuer === certIssuer) &&
        matches(certQuery, c.name.es, c.name.en, c.issuer),
    )
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.issued.localeCompare(a.issued));

  const categoryOptions = [
    { id: "all" as const, label: t.certs.all, count: certifications.length },
    ...certCategories.map((c) => ({
      id: c.id,
      label: l(c.label),
      count: certifications.filter((x) => x.category === c.id).length,
    })),
  ];

  return (
    <section id="certifications" className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.certs.eyebrow}
          title={t.certs.title}
          accent={t.certs.titleAccent}
          intro={t.certs.intro}
        />

        <div className="mt-16 grid grid-cols-1 gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-4">
            <Bezel tone="dark" className="h-full bg-brunswick/90" innerClassName="flex h-full flex-col p-6 sm:p-7" data-tone="dark">
              <Counter
                value={String(certifications.length)}
                className="font-display text-[clamp(4.5rem,8vw,6.5rem)] leading-[0.85] tracking-[-0.045em] text-bone"
              />
              <p className="mt-3 text-[15px] text-bone/70">{t.hero.stats.certifications}</p>

              <div className="mt-8">
                <p className="font-mono text-[10.5px] tracking-[0.2em] text-bone/45 uppercase">{t.certs.byYear}</p>
                <ul className="mt-4 flex h-28 items-end gap-3">
                  {byYear.map(([year, n], i) => (
                    <li key={year} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <span className="font-mono text-[11px] text-sage">{n}</span>
                      <motion.span
                        className="w-full origin-bottom rounded-t-md bg-gradient-to-t from-fern to-sage"
                        style={{ height: `${Math.max((n / maxPerYear) * 100, 6)}%` }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.2 + i * 0.08 }}
                      />
                      <span className="font-mono text-[10.5px] text-bone/50">{year}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <p className="font-mono text-[10.5px] tracking-[0.2em] text-bone/45 uppercase">{t.certs.issuer}</p>
                <ul className="mt-3 -mx-3 space-y-0.5">
                  {issuers.map((issuer) => (
                    <li key={issuer}>
                      <button
                        type="button"
                        onClick={() => setCertIssuer(certIssuer === issuer ? "all" : issuer)}
                        aria-pressed={certIssuer === issuer}
                        className={clsx(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] transition-colors duration-300",
                          certIssuer === issuer ? "bg-bone text-abyss" : "text-bone/75 hover:bg-white/[0.06] hover:text-bone",
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={clsx(
                              "size-1.5 rounded-full transition-colors",
                              certIssuer === issuer ? "bg-fern" : "bg-sage/50",
                            )}
                          />
                          {issuer}
                        </span>
                        <span className={clsx("font-mono", certIssuer === issuer ? "text-abyss/60" : "text-bone/50")}>
                          {certifications.filter((c) => c.issuer === issuer).length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Bezel>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-[auto_1fr] lg:col-span-8 lg:gap-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-hunter uppercase sm:col-span-3">
              {t.certs.featured}
            </p>
            {featured.map((c, i) => (
              <FeaturedCredential key={c.id} cert={c} delay={0.06 * i} />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="pointer-events-none sticky top-[4.5rem] z-20 mt-16 py-3 sm:top-[5.25rem]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="pointer-events-auto -mx-4 -my-4 min-w-0 overflow-x-auto px-4 py-4 no-scrollbar">
              <div className="inline-flex gap-1 rounded-full p-1 bg-paper/80 shadow-[0_12px_40px_-18px_rgba(28,42,34,0.4)] ring-1 ring-ink/[0.08] backdrop-blur-xl">
                {categoryOptions.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setCertCategory(o.id)}
                    aria-pressed={certCategory === o.id}
                    className={clsx(
                      "relative isolate flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-300",
                      certCategory === o.id ? "text-paper" : "text-muted hover:text-ink",
                    )}
                  >
                    {certCategory === o.id && (
                      <motion.span
                        layoutId="cert-category"
                        transition={springSnappy}
                        className="absolute inset-0 -z-10 rounded-full bg-hunter"
                      />
                    )}
                    {o.label}
                    <span className={clsx("font-mono text-[10.5px]", certCategory === o.id ? "text-paper/60" : "text-muted/70")}>
                      {o.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <AnimatePresence initial={false}>
                {certIssuer !== "all" && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={springSnappy}
                    onClick={() => setCertIssuer("all")}
                    className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-hunter pr-2 pl-4 text-[13px] font-medium text-paper"
                  >
                    {certIssuer}
                    <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                      <X size={11} weight="bold" />
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
              <label className="relative block flex-1 lg:w-72 lg:flex-none">
                <span className="sr-only">{t.certs.search}</span>
                <MagnifyingGlass
                  size={15}
                  weight="light"
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
                />
                <input
                  type="search"
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  placeholder={t.certs.search}
                  className="h-11 w-full rounded-full pr-9 pl-10 text-[13px] text-ink outline-none placeholder:text-muted/70 focus:ring-fern bg-paper/80 shadow-[0_12px_40px_-18px_rgba(28,42,34,0.4)] ring-1 ring-ink/[0.08] backdrop-blur-xl"
                />
                {certQuery && (
                  <button
                    type="button"
                    onClick={() => setCertQuery("")}
                    aria-label="Clear"
                    className="absolute top-1/2 right-2.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-ink/[0.06] hover:text-ink"
                  >
                    <X size={11} weight="bold" />
                  </button>
                )}
              </label>
            </div>
          </div>
        </div>
        <p className="mt-1 mb-5 font-mono text-[11px] tracking-wide text-muted" aria-live="polite">
          {t.certs.showing(visible.length, certifications.length)}
        </p>

        <ul className="mt-2 grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((c) => (
              <CertCard key={c.id} cert={c} />
            ))}
          </AnimatePresence>
        </ul>
        {visible.length === 0 && <p className="mt-6 text-[14px] text-muted">{t.certs.empty}</p>}
      </div>
    </section>
  );
}

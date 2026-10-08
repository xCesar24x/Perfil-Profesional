"use client";

import {
  ArrowElbowDownLeft,
  ArrowsOutSimple,
  Briefcase,
  Certificate,
  Copy,
  Crosshair,
  DownloadSimple,
  Hash,
  Lightning,
  MagnifyingGlass,
  Path,
  Translate,
} from "@phosphor-icons/react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
import { roles } from "@/data/roles";
import { skillCategories, skills } from "@/data/skills";
import { formatRange } from "@/lib/dates";
import { matches } from "@/lib/evidence";
import { easeDrawer, springSnappy } from "@/lib/motion";
import { useLaser } from "@/lib/laser";
import { useStore } from "@/lib/store";
import { Kbd } from "@/components/ui/primitives";
import { SECTIONS } from "./Nav";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: ReactNode;
  keywords: string;
  run: () => void;
};

const iconProps = { size: 16, weight: "light" as const };

export function CommandPalette() {
  const store = useStore();
  const { t, l, lang, paletteOpen, setPaletteOpen } = store;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const [laser, setLaser] = useLaser();

  const close = () => setPaletteOpen(false);

  const items = useMemo<Item[]>(() => {
    const sectionLabels: Record<(typeof SECTIONS)[number], string> = {
      profile: t.nav.profile,
      impact: t.nav.impact,
      experience: t.nav.experience,
      skills: t.nav.skills,
      certifications: t.nav.certifications,
      education: t.nav.education,
      contact: t.nav.contact,
    };
    return [
      ...SECTIONS.map((id) => ({
        id: `section-${id}`,
        group: t.palette.sections,
        label: sectionLabels[id],
        icon: <Hash {...iconProps} />,
        keywords: id,
        run: () => store.scrollToSection(id),
      })),
      ...roles.map((r) => ({
        id: `role-${r.id}`,
        group: t.palette.roles,
        label: `${l(r.title)} · ${r.company}`,
        hint: formatRange(r.start, r.end, t),
        icon: <Briefcase {...iconProps} />,
        keywords: `${r.title.es} ${r.title.en} ${r.company} ${r.industry.es} ${r.industry.en}`,
        run: () => store.focusRole(r.id),
      })),
      ...skills.map((s) => ({
        id: `skill-${s.id}`,
        group: t.palette.skills,
        label: l(s.name),
        hint: l(skillCategories.find((c) => c.id === s.category)!.label),
        icon: <Lightning {...iconProps} />,
        keywords: `${s.name.es} ${s.name.en}`,
        run: () => store.focusSkill(s.id),
      })),
      ...certifications.map((c) => ({
        id: `cert-${c.id}`,
        group: t.palette.certs,
        label: l(c.name),
        hint: c.issuer,
        icon: <Certificate {...iconProps} />,
        keywords: `${c.name.es} ${c.name.en} ${c.issuer}`,
        run: () => store.focusCert(c.id),
      })),
      {
        id: "action-lang",
        group: t.palette.actions,
        label: t.palette.switchLang,
        icon: <Translate {...iconProps} />,
        keywords: "language idioma english español",
        run: () => store.switchLang(),
      },
      {
        id: "action-timeline",
        group: t.palette.actions,
        label: t.palette.timeline,
        icon: <Path {...iconProps} />,
        keywords: "timeline linea tiempo trayectoria resumen summary",
        run: () => store.setTimelineOpen(true),
      },
      {
        id: "action-laser",
        group: t.palette.actions,
        label: laser ? t.palette.laserOff : t.palette.laserOn,
        hint: "L",
        icon: <Crosshair {...iconProps} />,
        keywords: "laser puntero pointer presentacion presentation",
        run: () => setLaser(!laser),
      },
      {
        id: "action-expand",
        group: t.palette.actions,
        label: t.palette.expandAll,
        icon: <ArrowsOutSimple {...iconProps} />,
        keywords: "expand expandir all todo",
        run: () => {
          store.setChapter("all");
          store.setAllRoles(true);
          store.scrollToSection("experience");
        },
      },
      {
        id: "action-cv",
        group: t.palette.actions,
        label: t.palette.downloadCv,
        icon: <DownloadSimple {...iconProps} />,
        keywords: "cv resume curriculum pdf",
        run: () => {
          const a = document.createElement("a");
          a.href = profile.cv[lang];
          a.download = "";
          a.click();
        },
      },
      {
        id: "action-email",
        group: t.palette.actions,
        label: t.palette.copyEmail,
        hint: profile.email,
        icon: <Copy {...iconProps} />,
        keywords: "email correo contact contacto",
        run: () => void navigator.clipboard?.writeText(profile.email),
      },
    ];
  }, [t, l, lang, store, laser, setLaser]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return items.filter((i) => i.id.startsWith("section-") || i.id.startsWith("role-") || i.id.startsWith("action-"));
    }
    const perGroup = new Map<string, number>();
    return items.filter((i) => {
      if (!matches(query, i.label, i.keywords, i.hint ?? "")) return false;
      const n = perGroup.get(i.group) ?? 0;
      perGroup.set(i.group, n + 1);
      return n < 8;
    });
  }, [items, query]);

  const grouped = useMemo(() => {
    const groups: { name: string; items: (Item & { index: number })[] }[] = [];
    results.forEach((item, index) => {
      let g = groups.find((x) => x.name === item.group);
      if (!g) groups.push((g = { name: item.group, items: [] }));
      g.items.push({ ...item, index });
    });
    return groups;
  }, [results]);

  useEffect(() => {
    if (paletteOpen) {
      restoreFocus.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      restoreFocus.current?.focus?.();
    }
  }, [paletteOpen]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    close();
    setQuery("");
    setActive(0);
    window.setTimeout(item.run, 120);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={t.nav.close}
            onClick={close}
            className="absolute inset-0 cursor-default bg-abyss/45 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.search}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18, ease: easeDrawer } }}
            transition={springSnappy}
            className="relative w-full max-w-xl rounded-[1.6rem] bg-paper/95 p-1.5 shadow-[0_40px_120px_-30px_rgba(16,26,20,0.65)] ring-1 ring-ink/10"
            onKeyDown={onKeyDown}
          >
            <div className="overflow-hidden rounded-[calc(1.6rem-0.375rem)] bg-surface ring-1 ring-ink/[0.05]">
              <label className="flex items-center gap-3 border-b border-ink/[0.07] px-5">
                <MagnifyingGlass size={18} weight="light" className="shrink-0 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder={t.palette.placeholder}
                  className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                />
                <Kbd>Esc</Kbd>
              </label>

              <div ref={listRef} id="palette-list" role="listbox" className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
                {grouped.length === 0 && <p className="px-3 py-10 text-center text-[14px] text-muted">{t.palette.empty}</p>}
                {grouped.map((g) => (
                  <div key={g.name} className="mb-1">
                    <p className="px-3 pt-3 pb-1.5 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{g.name}</p>
                    {g.items.map((item) => (
                      <button
                        key={item.id}
                        id={`palette-${item.id}`}
                        type="button"
                        role="option"
                        aria-selected={active === item.index}
                        data-index={item.index}
                        onMouseMove={() => setActive(item.index)}
                        onClick={() => run(item)}
                        className={clsx(
                          "relative isolate flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] transition-colors duration-150",
                          active === item.index ? "text-ink" : "text-ink/75",
                        )}
                      >
                        {active === item.index && (
                          <motion.span
                            layoutId="palette-active"
                            transition={{ type: "spring", stiffness: 600, damping: 45 }}
                            className="absolute inset-0 -z-10 rounded-xl bg-ink/[0.06]"
                          />
                        )}
                        <span className={clsx("shrink-0", active === item.index ? "text-fern" : "text-muted")}>{item.icon}</span>
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        {item.hint && <span className="hidden shrink-0 text-[12px] text-muted sm:block">{item.hint}</span>}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 border-t border-ink/[0.07] px-5 py-3 text-[11.5px] text-muted">
                <span className="flex items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd> {t.palette.hint}
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>
                    <ArrowElbowDownLeft size={11} weight="bold" />
                  </Kbd>
                  {t.palette.open}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

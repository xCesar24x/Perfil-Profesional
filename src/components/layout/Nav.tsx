"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { profile } from "@/data/profile";
import type { Lang } from "@/data/types";
import { easeDrawer, easeOutExpo, springSnappy } from "@/lib/motion";
import { useStore } from "@/lib/store";
import { Kbd } from "@/components/ui/primitives";

export const SECTIONS = ["profile", "impact", "experience", "skills", "certifications", "education", "contact"] as const;
export type SectionId = (typeof SECTIONS)[number];
const DARK_SECTIONS = new Set<SectionId>(["profile", "skills", "contact"]);

/** Tracks which section crosses a horizontal band of the viewport. */
function useSectionInBand(rootMargin: string): SectionId {
  const [active, setActive] = useState<SectionId>("profile");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin, threshold: 0 },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [rootMargin]);
  return active;
}

const subscribeNoop = () => () => {};
function useIsMac() {
  return useSyncExternalStore(
    subscribeNoop,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => false,
  );
}

function LangToggle({ tone }: { tone: "light" | "dark" }) {
  const { lang, switchLang, t } = useStore();
  return (
    <div
      role="group"
      aria-label={t.nav.switchTo}
      className={clsx(
        "relative flex rounded-full p-0.5 font-mono text-[11px] font-medium tracking-wider",
        tone === "dark" ? "bg-white/[0.07]" : "bg-ink/[0.05]",
      )}
    >
      {(["es", "en"] as Lang[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLang(code)}
          aria-pressed={lang === code}
          className={clsx(
            "relative z-10 rounded-full px-2.5 py-1.5 uppercase transition-colors duration-300",
            lang === code
              ? tone === "dark"
                ? "text-abyss"
                : "text-paper"
              : tone === "dark"
                ? "text-bone/60 hover:text-bone"
                : "text-muted hover:text-ink",
          )}
        >
          {lang === code && (
            <motion.span
              layoutId="lang-thumb"
              transition={springSnappy}
              className={clsx("absolute inset-0 -z-10 rounded-full", tone === "dark" ? "bg-bone" : "bg-hunter")}
            />
          )}
          {code}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t, scrollToSection, setPaletteOpen } = useStore();
  const active = useSectionInBand("-45% 0px -54% 0px");
  const underNav = useSectionInBand("0px 0px -94% 0px");
  const tone = DARK_SECTIONS.has(underNav) ? "dark" : "light";
  const [menuOpen, setMenuOpen] = useState(false);
  const isMac = useIsMac();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const labels: Record<SectionId, string> = {
    profile: t.nav.profile,
    impact: t.nav.impact,
    experience: t.nav.experience,
    skills: t.nav.skills,
    certifications: t.nav.certifications,
    education: t.nav.education,
    contact: t.nav.contact,
  };

  const go = (id: SectionId) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gradient-to-r from-fern via-sage to-bone"
      />

      <header
        style={{ animationDelay: "0.2s" }}
        className="enter-drop pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-5"
      >
        <nav
          data-tone={tone}
          className={clsx(
            "pointer-events-auto flex items-center gap-1 rounded-full p-1.5 backdrop-blur-xl transition-[background-color,box-shadow] duration-700 ease-drawer",
            tone === "dark"
              ? "bg-abyss/55 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
              : "bg-paper/75 shadow-[0_12px_40px_-18px_rgba(28,42,34,0.35)] ring-1 ring-ink/[0.08]",
          )}
        >
          <button
            type="button"
            onClick={() => go("profile")}
            aria-label={profile.name}
            className={clsx(
              "flex size-9 items-center justify-center rounded-full font-display text-[17px] italic transition-colors duration-500",
              tone === "dark" ? "bg-bone text-abyss" : "bg-hunter text-paper",
            )}
          >
            {profile.initials}
          </button>

          <ul className="hidden items-center lg:flex">
            {SECTIONS.slice(1).map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => go(id)}
                  className={clsx(
                    "relative isolate rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-300",
                    active === id
                      ? tone === "dark"
                        ? "text-bone"
                        : "text-ink"
                      : tone === "dark"
                        ? "text-bone/55 hover:text-bone"
                        : "text-muted hover:text-ink",
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      transition={springSnappy}
                      className={clsx(
                        "absolute inset-0 -z-10 rounded-full",
                        tone === "dark" ? "bg-white/[0.09]" : "bg-ink/[0.06]",
                      )}
                    />
                  )}
                  {labels[id]}
                </button>
              </li>
            ))}
          </ul>

          <span className={clsx("mx-1 hidden h-5 w-px lg:block", tone === "dark" ? "bg-white/10" : "bg-ink/10")} />

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label={t.nav.search}
            className={clsx(
              "flex h-9 items-center gap-2 rounded-full px-2.5 transition-colors duration-300 sm:px-3",
              tone === "dark" ? "text-bone/70 hover:bg-white/[0.07] hover:text-bone" : "text-muted hover:bg-ink/[0.05] hover:text-ink",
            )}
          >
            <MagnifyingGlass size={17} weight="light" />
            <span className="hidden items-center gap-1 sm:flex">
              <Kbd tone={tone}>{isMac ? "⌘" : "Ctrl"}</Kbd>
              <Kbd tone={tone}>K</Kbd>
            </span>
          </button>

          <LangToggle tone={tone} />

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            className={clsx(
              "relative flex size-9 items-center justify-center rounded-full lg:hidden",
              tone === "dark" ? "text-bone hover:bg-white/[0.07]" : "text-ink hover:bg-ink/[0.05]",
            )}
          >
            <span
              className={clsx(
                "absolute h-px w-4 bg-current transition-transform duration-500 ease-drawer",
                menuOpen ? "rotate-45" : "-translate-y-[3.5px]",
              )}
            />
            <span
              className={clsx(
                "absolute h-px w-4 bg-current transition-transform duration-500 ease-drawer",
                menuOpen ? "-rotate-45" : "translate-y-[3.5px]",
              )}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: easeDrawer, delay: 0.1 } }}
            transition={{ duration: 0.5, ease: easeDrawer }}
            className="fixed inset-0 z-30 bg-abyss/90 backdrop-blur-3xl lg:hidden"
            data-tone="dark"
          >
            <nav className="flex h-full flex-col justify-center px-8 pt-20 pb-12">
              <ul className="space-y-1">
                {SECTIONS.map((id, i) => (
                  <li key={id} className="overflow-hidden">
                    <motion.button
                      type="button"
                      onClick={() => go(id)}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "60%", opacity: 0, transition: { duration: 0.25, ease: easeDrawer } }}
                      transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.08 + i * 0.05 }}
                      className={clsx(
                        "flex w-full items-baseline gap-4 py-1.5 text-left font-display text-[2.6rem] leading-tight",
                        active === id ? "text-bone" : "text-bone/45",
                      )}
                    >
                      <span className="font-mono text-[11px] tracking-widest text-sage">0{i + 1}</span>
                      {labels[id]}
                    </motion.button>
                  </li>
                ))}
              </ul>
              <motion.a
                href={`mailto:${profile.email}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-12 font-mono text-[12px] tracking-wide text-sage"
              >
                {profile.email}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

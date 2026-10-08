"use client";

import { ArrowUp, Check, Copy, DownloadSimple, LinkedinLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { easeOutExpo } from "@/lib/motion";
import { useNow } from "@/lib/now";
import { useStore } from "@/lib/store";
import { Eyebrow, IslandButton, Reveal } from "@/components/ui/primitives";

export function Contact() {
  const { t, l, lang, scrollToSection } = useStore();
  const [copied, setCopied] = useState(false);
  const year = useNow().slice(0, 4);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section
      id="contact"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-abyss pt-24 pb-10 text-bone sm:pt-32 lg:pt-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(88,129,87,0.45),transparent_65%),linear-gradient(180deg,#273b31,#1d2c24)]"
      />
      <div className="container-page">
        <Reveal>
          <Eyebrow tone="dark">{t.contact.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] tracking-[-0.045em]">
            <em className="italic">{t.contact.title}</em>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-lg text-[17px] leading-relaxed text-bone/70 text-pretty">{t.contact.intro}</p>
            <p className="mt-4 max-w-lg font-display text-[1.5rem] leading-snug text-sage italic">
              {l(profile.difference)}
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-6 lg:items-end">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-[clamp(1.5rem,3.2vw,2.4rem)] tracking-[-0.01em] text-bone underline decoration-white/20 underline-offset-[10px] transition-colors duration-300 hover:decoration-sage"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copy}
                aria-label={t.contact.copy}
                className="relative flex size-10 items-center justify-center rounded-full bg-white/[0.07] text-bone/80 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12] hover:text-bone"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25, ease: easeOutExpo }}
                  >
                    {copied ? <Check size={16} weight="bold" className="text-sage" /> : <Copy size={16} weight="light" />}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-9 rounded-md bg-bone px-2 py-1 text-[11px] font-medium text-abyss"
                    >
                      {t.contact.copied}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <IslandButton tone="dark" href={profile.linkedin} external icon={<LinkedinLogo size={16} weight="light" />}>
                {t.contact.linkedin}
              </IslandButton>
              <IslandButton
                tone="dark"
                variant="ghost"
                href={profile.cv[lang]}
                download
                icon={<DownloadSimple size={16} weight="regular" />}
              >
                {t.contact.cv}
              </IslandButton>
            </div>
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-col gap-6 border-t border-white/[0.08] pt-8 text-[12.5px] text-bone/45 sm:flex-row sm:items-center sm:justify-between lg:mt-36">
          <p>
            © {year} {profile.name} · {l(profile.location)}
          </p>
          <button
            type="button"
            onClick={() => scrollToSection("profile")}
            className="group inline-flex items-center gap-2 self-start text-bone/60 transition-colors hover:text-bone sm:self-auto"
          >
            {t.contact.backToTop}
            <span className="flex size-8 items-center justify-center rounded-full bg-white/[0.06] transition-transform duration-500 ease-drawer group-hover:-translate-y-0.5">
              <ArrowUp size={14} weight="light" />
            </span>
          </button>
        </footer>
      </div>
    </section>
  );
}

"use client";

import { MotionConfig, motion } from "motion/react";
import type { Lang } from "@/data/types";
import { StoreProvider, useStore } from "@/lib/store";
import { CommandPalette } from "./layout/CommandPalette";
import { Nav } from "./layout/Nav";
import { Certifications } from "./sections/Certifications";
import { Contact } from "./sections/Contact";
import { Education } from "./sections/Education";
import { Experience } from "./sections/experience/Experience";
import { Hero } from "./sections/Hero";
import { Impact } from "./sections/Impact";
import { Skills } from "./sections/Skills";

function Page() {
  const { switching } = useStore();
  return (
    <>
      <Nav />
      <CommandPalette />
      <motion.main
        animate={{ opacity: switching ? 0 : 1, y: switching ? 6 : 0 }}
        transition={{ duration: switching ? 0.18 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Hero />
        <Impact />
        <Experience />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </motion.main>
    </>
  );
}

export function CareerApp({ lang }: { lang: Lang }) {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider initialLang={lang}>
        <Page />
      </StoreProvider>
    </MotionConfig>
  );
}

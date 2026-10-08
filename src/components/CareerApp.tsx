"use client";

import { MotionConfig } from "motion/react";
import type { Lang } from "@/data/types";
import { StoreProvider } from "@/lib/store";
import { CommandPalette } from "./layout/CommandPalette";
import { LaserPointer } from "./layout/LaserPointer";
import { Nav } from "./layout/Nav";
import { Certifications } from "./sections/Certifications";
import { Contact } from "./sections/Contact";
import { Education } from "./sections/Education";
import { Experience } from "./sections/experience/Experience";
import { Hero } from "./sections/Hero";
import { Impact } from "./sections/Impact";
import { Skills } from "./sections/Skills";

function Page() {
  return (
    <>
      <Nav />
      <CommandPalette />
      <LaserPointer />
      <main>
        <Hero />
        <Impact />
        <Experience />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </main>
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

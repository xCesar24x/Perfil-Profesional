"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { roleById, roles } from "@/data/roles";
import { skillById } from "@/data/skills";
import type { CertCategoryId, ChapterId, Issuer, Lang, Localized, SkillCategoryId } from "@/data/types";
import { dictionaries, type Dictionary } from "@/data/ui";

type Store = {
  lang: Lang;
  t: Dictionary;
  /** Picks the current-language side of a localized string. */
  l: (value: Localized) => string;
  switchLang: (next?: Lang) => void;
  switching: boolean;

  openRoles: ReadonlySet<string>;
  toggleRole: (id: string) => void;
  setAllRoles: (open: boolean) => void;
  chapter: ChapterId | "all";
  setChapter: (chapter: ChapterId | "all") => void;

  skillCategory: SkillCategoryId | "all";
  setSkillCategory: (category: SkillCategoryId | "all") => void;
  selectedSkill: string;
  setSelectedSkill: (id: string) => void;
  skillQuery: string;
  setSkillQuery: (q: string) => void;

  openCert: string | null;
  setOpenCert: (id: string | null) => void;
  certCategory: CertCategoryId | "all";
  setCertCategory: (category: CertCategoryId | "all") => void;
  certIssuer: Issuer | "all";
  setCertIssuer: (issuer: Issuer | "all") => void;
  certQuery: string;
  setCertQuery: (q: string) => void;

  /** Element id that briefly glows after a cross-section jump. */
  flash: string | null;

  focusRole: (id: string) => void;
  focusSkill: (id: string) => void;
  focusCert: (id: string) => void;
  scrollToSection: (id: string) => void;

  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
};

const StoreContext = createContext<Store | null>(null);

const TITLES: Record<Lang, string> = {
  es: "César Madrigal Rodríguez — Revenue Management, Finanzas y Automatización",
  en: "César Madrigal Rodríguez — Revenue Management, Finance & Automation",
};

function scrollIntoViewSoon(elementId: string, block: ScrollLogicalPosition = "start") {
  // Two frames: one for React to commit, one for layout to settle.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth", block });
    }),
  );
}

export function StoreProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [switching, setSwitching] = useState(false);
  const [openRoles, setOpenRoles] = useState<Set<string>>(() => new Set([roles[0].id]));
  const [chapter, setChapter] = useState<ChapterId | "all">("all");
  const [skillCategory, setSkillCategory] = useState<SkillCategoryId | "all">("all");
  const [selectedSkill, setSelectedSkill] = useState("revenue-management");
  const [skillQuery, setSkillQuery] = useState("");
  const [openCert, setOpenCert] = useState<string | null>(null);
  const [certCategory, setCertCategory] = useState<CertCategoryId | "all">("all");
  const [certIssuer, setCertIssuer] = useState<Issuer | "all">("all");
  const [certQuery, setCertQuery] = useState("");
  const [flash, setFlash] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const flashTimer = useRef<number | undefined>(undefined);

  const t = dictionaries[lang];
  const l = useCallback((value: Localized) => value[lang], [lang]);

  const switchLang = useCallback(
    (next?: Lang) => {
      const target: Lang = next ?? (lang === "es" ? "en" : "es");
      if (target === lang) return;
      setSwitching(true);
      window.setTimeout(() => {
        setLang(target);
        document.documentElement.lang = target;
        document.title = TITLES[target];
        const path = target === "en" ? "/en" : "/";
        window.history.replaceState(window.history.state, "", path + window.location.hash);
        setSwitching(false);
      }, 180);
    },
    [lang],
  );

  const pulse = useCallback((elementId: string) => {
    window.clearTimeout(flashTimer.current);
    setFlash(elementId);
    flashTimer.current = window.setTimeout(() => setFlash(null), 1800);
  }, []);

  const toggleRole = useCallback((id: string) => {
    setOpenRoles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const setAllRoles = useCallback((open: boolean) => {
    setOpenRoles(open ? new Set(roles.map((r) => r.id)) : new Set());
  }, []);

  const focusRole = useCallback(
    (id: string) => {
      const role = roleById.get(id);
      if (!role) return;
      setChapter((c) => (c === "all" || c === role.chapter ? c : "all"));
      setOpenRoles((prev) => new Set(prev).add(id));
      scrollIntoViewSoon(`role-${id}`);
      pulse(`role-${id}`);
    },
    [pulse],
  );

  const focusSkill = useCallback(
    (id: string) => {
      const skill = skillById.get(id);
      if (!skill) return;
      setSkillQuery("");
      setSkillCategory("all");
      setSelectedSkill(id);
      scrollIntoViewSoon("skills-explorer");
      pulse("skill-detail");
    },
    [pulse],
  );

  const focusCert = useCallback(
    (id: string) => {
      setCertCategory("all");
      setCertIssuer("all");
      setCertQuery("");
      setOpenCert(id);
      window.setTimeout(() => scrollIntoViewSoon(`cert-${id}`, "center"), 60);
      pulse(`cert-${id}`);
    },
    [pulse],
  );

  const scrollToSection = useCallback((id: string) => {
    scrollIntoViewSoon(id);
  }, []);

  // Deep links such as /en#role-grupo-anc open the role on arrival.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith("role-")) {
      const timer = window.setTimeout(() => focusRole(hash.slice(5)), 400);
      return () => window.clearTimeout(timer);
    }
  }, [focusRole]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<Store>(
    () => ({
      lang,
      t,
      l,
      switchLang,
      switching,
      openRoles,
      toggleRole,
      setAllRoles,
      chapter,
      setChapter,
      skillCategory,
      setSkillCategory,
      selectedSkill,
      setSelectedSkill,
      skillQuery,
      setSkillQuery,
      openCert,
      setOpenCert,
      certCategory,
      setCertCategory,
      certIssuer,
      setCertIssuer,
      certQuery,
      setCertQuery,
      flash,
      focusRole,
      focusSkill,
      focusCert,
      scrollToSection,
      paletteOpen,
      setPaletteOpen,
    }),
    [
      lang,
      t,
      l,
      switchLang,
      switching,
      openRoles,
      toggleRole,
      setAllRoles,
      chapter,
      skillCategory,
      selectedSkill,
      skillQuery,
      openCert,
      certCategory,
      certIssuer,
      certQuery,
      flash,
      focusRole,
      focusSkill,
      focusCert,
      scrollToSection,
      paletteOpen,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export type Lang = "es" | "en";

/** A string available in both languages. */
export type Localized = { es: string; en: string };

/** "YYYY-MM" */
export type YearMonth = `${number}-${string}`;

export type ChapterId = "builder" | "revenue" | "finance";

export type Chapter = {
  id: ChapterId;
  label: Localized;
  period: Localized;
  blurb: Localized;
};

export type Metric = {
  value: string;
  label: Localized;
};

export type ScopeGroup = {
  title: Localized;
  items: Localized[];
};

export type Role = {
  id: string;
  company: string;
  /** Legal name, client, or parent company shown under the company name. */
  companyNote?: Localized;
  title: Localized;
  start: YearMonth;
  /** null while the role is ongoing. */
  end: YearMonth | null;
  location: Localized;
  markets: Localized;
  industry: Localized;
  chapter: ChapterId;
  summary: Localized;
  /** Résumé bullets. Wrap emphasis in **double asterisks**. */
  highlights: Localized[];
  metrics: Metric[];
  /** Detailed scope, mostly from the LinkedIn descriptions. */
  scope: ScopeGroup[];
  skills: string[];
  /** id of the previous role at the same company, when this one was a promotion. */
  promotedFrom?: string;
};

export type SkillCategoryId =
  | "revenue"
  | "finance"
  | "data"
  | "automation"
  | "web"
  | "ai"
  | "methods";

export type SkillCategory = {
  id: SkillCategoryId;
  label: Localized;
  blurb: Localized;
};

export type Skill = {
  id: string;
  name: Localized;
  category: SkillCategoryId;
  description: Localized;
  /** Marks the skills featured in the résumé's "Skills & Tools" block. */
  core?: boolean;
};

export type CertCategoryId = "process" | "powerbi" | "data" | "automation" | "leadership";

export type CertCategory = {
  id: CertCategoryId;
  label: Localized;
};

export type Issuer = "LinkedIn Learning" | "Genpact" | "Udemy";

export type Certification = {
  id: string;
  name: Localized;
  issuer: Issuer;
  issued: YearMonth;
  category: CertCategoryId;
  skills: string[];
  credentialId?: string;
  url?: string;
  /** Multi-course learning path rather than a single course. */
  path?: boolean;
  featured?: boolean;
};

export type Education = {
  id: string;
  institution: string;
  degree: Localized;
  detail: Localized;
  start: number;
  end: number;
  inProgress?: boolean;
};

export type Language = {
  name: Localized;
  level: Localized;
  /** CEFR level, or "native". */
  cefr: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native";
};

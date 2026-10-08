import type { Education, Language, Localized } from "./types";

export const profile = {
  name: "César Madrigal Rodríguez",
  /** How the name breaks across the two hero lines. */
  nameLines: ["César Madrigal", "Rodríguez"] as const,
  initials: "CM",
  location: { es: "Heredia, Costa Rica", en: "Heredia, Costa Rica" } as Localized,
  email: "cesarmadrod24@hotmail.com",
  linkedin: "https://www.linkedin.com/in/c%C3%A9sar-madrigal-rodr%C3%ADguez-3a23351b2/",
  linkedinCerts:
    "https://www.linkedin.com/in/c%C3%A9sar-madrigal-rodr%C3%ADguez-3a23351b2/details/certifications/",
  cv: {
    es: "/cv/Cesar_Madrigal_CV_ES.pdf",
    en: "/cv/Cesar_Madrigal_CV_EN.pdf",
  },
  headline: {
    es: "Revenue Management · Finanzas · Impuestos · Automatización & IA",
    en: "Revenue Management · Finance · Tax · Automation & AI",
  } as Localized,
  statement: {
    lead: {
      es: "Entiendo el problema de negocio",
      en: "I understand the business problem",
    } as Localized,
    accent: {
      es: "y construyo el software que lo resuelve.",
      en: "and I build the software that solves it.",
    } as Localized,
  },
  intro: {
    es: "Más de 9 años en Finanzas, Impuestos y Revenue Management en 7 países de Latinoamérica. En los últimos años crucé una línea que pocos analistas cruzan: empecé a construir. Hoy diseño automatizaciones y productos SaaS full-stack asistidos por IA.",
    en: "9+ years in Finance, Tax and Revenue Management across 7 Latin American countries. In recent years I crossed a line most analysts never cross: I started building. Today I design automations and AI-assisted full-stack SaaS products.",
  } as Localized,
  difference: {
    es: "No me limito a analizar datos: construyo los sistemas que los capturan, los procesan y los convierten en decisiones.",
    en: "I don't just analyze data — I build the systems that capture it, process it, and turn it into decisions.",
  } as Localized,
  availability: {
    es: "Presencial · Híbrido · Remoto",
    en: "On-site · Hybrid · Remote",
  } as Localized,
  openTo: [
    { es: "Roles de Revenue Management", en: "Revenue Management roles" },
    { es: "Liderazgo financiero con enfoque tecnológico", en: "Tech-forward Finance leadership" },
    { es: "Consultoría de Producto / BI", en: "Product / BI consulting" },
    { es: "Colaboraciones SaaS", en: "SaaS collaborations" },
  ] as Localized[],
};

export const countries: { code: string; name: Localized }[] = [
  { code: "CR", name: { es: "Costa Rica", en: "Costa Rica" } },
  { code: "MX", name: { es: "México", en: "Mexico" } },
  { code: "GT", name: { es: "Guatemala", en: "Guatemala" } },
  { code: "NI", name: { es: "Nicaragua", en: "Nicaragua" } },
  { code: "PE", name: { es: "Perú", en: "Peru" } },
  { code: "CL", name: { es: "Chile", en: "Chile" } },
  { code: "AR", name: { es: "Argentina", en: "Argentina" } },
];

export const education: Education[] = [
  {
    id: "uh",
    institution: "Universidad Hispanoamericana",
    degree: {
      es: "Bachillerato en Administración y Gestión de Empresas",
      en: "Bachelor's in Business Administration & Management",
    },
    detail: { es: "Énfasis en Gerencia", en: "Emphasis in Management" },
    start: 2024,
    end: 2028,
    inProgress: true,
  },
  {
    id: "ctp-tech",
    institution: "Colegio Técnico Profesional de Flores",
    degree: { es: "Técnico en Contabilidad General", en: "Accounting Technician" },
    detail: { es: "Formación técnica en contabilidad", en: "Technical degree in general accounting" },
    start: 2014,
    end: 2016,
  },
  {
    id: "ctp-hs",
    institution: "Colegio Técnico Profesional de Flores",
    degree: { es: "Bachillerato en Educación Media", en: "High School Diploma" },
    detail: { es: "Educación secundaria", en: "Secondary education" },
    start: 2014,
    end: 2016,
  },
];

export const languages: Language[] = [
  { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" }, cefr: "native" },
  { name: { es: "Inglés", en: "English" }, level: { es: "C1 · Avanzado", en: "C1 · Advanced" }, cefr: "C1" },
];

/** Headline metrics shown in the Impact bento. Each one opens the role it came from. */
export const impact: {
  id: string;
  value: string;
  label: Localized;
  context: Localized;
  roleId: string;
}[] = [
  {
    id: "revenue",
    value: "+35%",
    label: { es: "en ingresos regionales", en: "regional revenue" },
    context: {
      es: "Estrategia de revenue para una flota de 500+ vehículos en 4 países.",
      en: "Revenue strategy for a 500+ vehicle fleet across 4 countries.",
    },
    roleId: "grupo-anc",
  },
  {
    id: "manual-time",
    value: "−60%",
    label: { es: "tiempo de procesamiento manual", en: "manual processing time" },
    context: {
      es: "Flujos de reportes automatizados con Power Automate.",
      en: "Reporting workflows automated with Power Automate.",
    },
    roleId: "genpact-tax",
  },
  {
    id: "accuracy",
    value: "99.8%",
    label: { es: "precisión de facturación mensual", en: "monthly billing accuracy" },
    context: {
      es: "Y +45% de eficiencia al migrar la aplicación de pagos.",
      en: "Plus +45% efficiency migrating cash application.",
    },
    roleId: "genpact-ar",
  },
  {
    id: "hours",
    value: "425 h",
    label: { es: "de trabajo manual al año", en: "of manual work per year" },
    context: {
      es: "Identificadas y costeadas para el RPA de planilla.",
      en: "Identified and costed for the payroll RPA.",
    },
    roleId: "dos-pinos",
  },
  {
    id: "models",
    value: "53",
    label: { es: "modelos de datos con alertas", en: "data models with alerts" },
    context: {
      es: "Control proactivo en Power BI para el Centro de Servicios Compartidos.",
      en: "Proactive Power BI control for the Shared Services Center.",
    },
    roleId: "dos-pinos",
  },
  {
    id: "solutions",
    value: "15+",
    label: { es: "soluciones digitales entregadas", en: "digital solutions shipped" },
    context: {
      es: "Incluye un KDS multi-tenant y VetCore, ambos SaaS propios.",
      en: "Including a multi-tenant KDS and VetCore, both proprietary SaaS.",
    },
    roleId: "ruta-digital",
  },
  {
    id: "collector",
    value: "Top 3",
    label: { es: "en cobranza · Argentina", en: "collector · Argentina" },
    context: {
      es: "Portafolio de Argentina en Walmart LATAM.",
      en: "Argentina portfolio at Walmart LATAM.",
    },
    roleId: "walmart",
  },
];

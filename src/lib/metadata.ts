import type { Metadata, Viewport } from "next";
import type { Lang } from "@/data/types";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const copy: Record<Lang, { title: string; description: string; locale: string }> = {
  es: {
    title: "César Madrigal Rodríguez — Revenue Management, Finanzas y Automatización",
    description:
      "9+ años en Finanzas, Impuestos y Revenue Management en 7 países de LATAM. Entiendo el problema de negocio y construyo el software que lo resuelve.",
    locale: "es_CR",
  },
  en: {
    title: "César Madrigal Rodríguez — Revenue Management, Finance & Automation",
    description:
      "9+ years in Finance, Tax and Revenue Management across 7 LATAM countries. I understand the business problem and build the software that solves it.",
    locale: "en_US",
  },
};

export function buildMetadata(lang: Lang): Metadata {
  const { title, description, locale } = copy[lang];
  const path = lang === "en" ? "/en" : "/";
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: "César Madrigal Rodríguez",
    authors: [{ name: "César Madrigal Rodríguez" }],
    alternates: {
      canonical: path,
      languages: { es: "/", en: "/en" },
    },
    openGraph: {
      type: "profile",
      url: path,
      title,
      description,
      locale,
      siteName: "César Madrigal Rodríguez",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const viewport: Viewport = {
  themeColor: "#344e41",
  colorScheme: "light",
};

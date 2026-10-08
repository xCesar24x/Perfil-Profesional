import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { certifications } from "@/data/certifications";
import { countries, profile } from "@/data/profile";
import { roles } from "@/data/roles";
import type { Lang } from "@/data/types";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "node_modules/@fontsource/instrument-serif/files");

const copy: Record<Lang, { stats: string[] }> = {
  es: { stats: ["años de experiencia", "países de LATAM", "empresas", "certificaciones"] },
  en: { stats: ["years of experience", "LATAM countries", "companies", "certifications"] },
};

// Read once at module scope so the images can be prerendered at build time.
const [serif, serifItalic] = await Promise.all([
  readFile(join(fontDir, "instrument-serif-latin-400-normal.woff")),
  readFile(join(fontDir, "instrument-serif-latin-400-italic.woff")),
]);

export function renderOgImage(lang: Lang) {

  const values = ["9+", String(countries.length), String(new Set(roles.map((r) => r.company)).size), String(certifications.length)];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#dad7cd",
          backgroundColor: "#2b4337",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(88,129,87,0.75), transparent 55%), radial-gradient(circle at 0% 100%, rgba(29,44,36,0.95), transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 999,
              backgroundColor: "#dad7cd",
              color: "#1d2c24",
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 30,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "rgba(218,215,205,0.65)", letterSpacing: 1 }}>
            {profile.location[lang]}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 116, lineHeight: 0.9, letterSpacing: -3 }}>
            {profile.nameLines[0]}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 116,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: "#a3b18a",
            }}
          >
            {profile.nameLines[1]}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "rgba(218,215,205,0.75)", letterSpacing: 0.5 }}>
            {profile.headline[lang]}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {values.map((value, i) => (
            <div
              key={copy[lang].stats[i]}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "18px 22px",
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 52, lineHeight: 1 }}>{value}</div>
              <div style={{ display: "flex", marginTop: 6, fontSize: 19, color: "rgba(218,215,205,0.6)" }}>
                {copy[lang].stats[i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}

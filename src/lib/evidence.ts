import { certifications } from "@/data/certifications";
import { roles } from "@/data/roles";
import type { Certification, Role, YearMonth } from "@/data/types";
import { parseYM } from "./dates";

export type SkillEvidence = {
  roles: Role[];
  certs: Certification[];
  /** Distinct months across every role that used the skill (overlaps counted once). */
  months: number;
};

function monthIndex(ym: YearMonth) {
  const { y, m } = parseYM(ym);
  return y * 12 + (m - 1);
}

export function getSkillEvidence(skillId: string, now: YearMonth): SkillEvidence {
  const usedIn = roles.filter((r) => r.skills.includes(skillId));
  const backing = certifications.filter((c) => c.skills.includes(skillId));

  const covered = new Set<number>();
  for (const r of usedIn) {
    const from = monthIndex(r.start);
    const to = monthIndex(r.end ?? now);
    for (let i = from; i <= to; i++) covered.add(i);
  }

  return { roles: usedIn, certs: backing, months: covered.size };
}

/** Accent-insensitive, case-insensitive matcher used by every search box. */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function matches(query: string, ...fields: string[]): boolean {
  const q = normalize(query.trim());
  if (!q) return true;
  const haystack = normalize(fields.join(" "));
  return q.split(/\s+/).every((token) => haystack.includes(token));
}

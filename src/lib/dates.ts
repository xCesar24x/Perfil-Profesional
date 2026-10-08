import type { Dictionary } from "@/data/ui";
import type { YearMonth } from "@/data/types";

export function parseYM(ym: YearMonth): { y: number; m: number } {
  const [y, m] = ym.split("-").map(Number);
  return { y, m };
}

export function currentYM(): YearMonth {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/** Inclusive month count, matching how LinkedIn reports durations. */
export function monthsBetween(start: YearMonth, end: YearMonth | null, now: YearMonth): number {
  const a = parseYM(start);
  const b = parseYM(end ?? now);
  return (b.y - a.y) * 12 + (b.m - a.m) + 1;
}

export function formatYM(ym: YearMonth, t: Dictionary): string {
  const { y, m } = parseYM(ym);
  return `${t.months[m - 1]} ${y}`;
}

export function formatRange(start: YearMonth, end: YearMonth | null, t: Dictionary): string {
  return `${formatYM(start, t)} — ${end ? formatYM(end, t) : t.experience.present}`;
}

export function formatDuration(months: number, t: Dictionary): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years) parts.push(t.durations.year(years));
  if (rest || !years) parts.push(t.durations.month(rest));
  return parts.join(" ");
}

/** Position of a year-month on a continuous axis, in fractional years. */
export function ymToYear(ym: YearMonth): number {
  const { y, m } = parseYM(ym);
  return y + (m - 1) / 12;
}

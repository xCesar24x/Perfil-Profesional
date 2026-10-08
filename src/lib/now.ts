"use client";

import { useSyncExternalStore } from "react";
import type { YearMonth } from "@/data/types";
import { currentYM } from "./dates";

/**
 * Month used for ongoing roles while prerendering. The client swaps in the real
 * current month right after hydration, so durations never go stale.
 */
export const AS_OF: YearMonth = "2026-10";

const subscribe = () => () => {};

export function useNow(): YearMonth {
  return useSyncExternalStore(subscribe, currentYM, () => AS_OF);
}

"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "laser-pointer";
const EVENT = "laser-pointer-change";

// Used when storage is blocked (e.g. some private windows), so the toggle still
// works for the current visit even though it can't be remembered.
let memory = true;

function read(): boolean {
  try {
    const stored = window.localStorage.getItem(KEY);
    return stored === null ? memory : stored === "on";
  } catch {
    return memory;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Presentation laser pointer preference: on by default, remembered per browser. */
export function useLaser(): [boolean, (on: boolean) => void] {
  const on = useSyncExternalStore(subscribe, read, () => true);
  const set = useCallback((next: boolean) => {
    memory = next;
    try {
      window.localStorage.setItem(KEY, next ? "on" : "off");
    } catch {
      // Falls back to `memory` above.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [on, set];
}

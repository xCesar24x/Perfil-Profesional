import type { Transition } from "motion/react";

/** Long, weighty settle used for reveals and large surfaces. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
/** Drawer-like curve for panels that open and close. */
export const easeDrawer = [0.32, 0.72, 0, 1] as const;

export const springSnappy: Transition = { type: "spring", stiffness: 420, damping: 36, mass: 0.8 };
export const springSoft: Transition = { type: "spring", stiffness: 220, damping: 30, mass: 1 };

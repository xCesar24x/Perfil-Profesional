import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

export const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const display = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const fontVariables = `${sans.variable} ${mono.variable} ${display.variable}`;

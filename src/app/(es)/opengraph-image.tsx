import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "César Madrigal Rodríguez — Revenue Management, Finanzas y Automatización";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("es");
}

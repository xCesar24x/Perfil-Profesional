import "../globals.css";
import { fontVariables } from "../fonts";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata("es");

export default function SpanishLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}

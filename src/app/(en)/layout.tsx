import "../globals.css";
import { fontVariables } from "../fonts";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata("en");

export default function EnglishLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}

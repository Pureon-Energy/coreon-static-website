import type { ReactNode } from "react";
import SiteScripts from "@/components/SiteScripts";
import { type Lang, asset } from "@/lib/i18n";
import { PLAUSIBLE } from "@/lib/site";

// Fonts are declared here instead of globals.css so their URLs pick up the GitHub Pages sub-path.
const FONTS = [
  ["Poppins", "600", "poppins-600"],
  ["Poppins", "700", "poppins-700"],
  ["Work Sans", "400 600", "work-sans"],
  ["IBM Plex Mono", "500", "ibm-plex-mono-500"],
] as const;

const fontFaces = FONTS.map(
  ([family, weight, file]) =>
    `@font-face{font-family:"${family}";font-weight:${weight};font-display:swap;src:url("${asset(`/assets/fonts/${file}.woff2`)}") format("woff2")}`,
).join("");

export default function RootHtml({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        {/* Set before first paint so .reveal elements don't flash visible then hide. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
        <link rel="preload" href={asset("/assets/fonts/poppins-700.woff2")} as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href={asset("/assets/fonts/work-sans.woff2")} as="font" type="font/woff2" crossOrigin="" />
        {PLAUSIBLE ? <script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.js" /> : null}
      </head>
      <body>
        {children}
        <SiteScripts />
      </body>
    </html>
  );
}

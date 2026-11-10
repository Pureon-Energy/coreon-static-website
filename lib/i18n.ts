import rawStrings from "./strings.json";
import { BASE_PATH, SITE_URL } from "./site";

export type Lang = "da" | "en";
export type Page = "" | "privacy";

export const LANGS: Lang[] = ["da", "en"];

const strings = rawStrings as Record<Lang, Record<string, string>>;

export function isLang(value: string | undefined): value is Lang {
  return value === "da" || value === "en";
}

export function t(lang: Lang, key: string): string {
  return strings[lang][key] ?? strings.da[key] ?? key;
}

// Copy is authored by us and contains inline markup (<span class="hl">, <strong>, <br>).
export function html(lang: Lang, key: string) {
  return { __html: t(lang, key) };
}

// Route without the GitHub Pages sub-path, e.g. /en/privacy/
export function route(lang: Lang, page: Page = ""): string {
  let p = lang === "en" ? "/en/" : "/";
  if (page === "privacy") p += lang === "en" ? "privacy/" : "privatliv/";
  return p;
}

// Link target for <a href>; plain anchors don't get Next's basePath automatically.
export function path(lang: Lang, page: Page = ""): string {
  return BASE_PATH + route(lang, page);
}

export function absUrl(lang: Lang, page: Page = ""): string {
  return SITE_URL + route(lang, page);
}

export function asset(p: string): string {
  return BASE_PATH + p;
}

import { type Lang, type Page, path, t } from "@/lib/i18n";

export default function LangSwitch({ lang, page, className }: { lang: Lang; page: Page; className: string }) {
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t(lang, "a11y.lang")}>
      <a href={path("da", page)} hrefLang="da" lang="da" aria-current={lang === "da" ? "true" : undefined}>
        DA
      </a>
      <a href={path("en", page)} hrefLang="en" lang="en" aria-current={lang === "en" ? "true" : undefined}>
        EN
      </a>
    </div>
  );
}

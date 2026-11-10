import type { ReactNode } from "react";
import { type Lang, type Page, html } from "@/lib/i18n";
import Footer from "./Footer";
import Header from "./Header";

// Replaces the WordPress body classes: .is-subpage gives the header its solid background.
export default function Shell({ lang, page, isFront, children }: { lang: Lang; page: Page; isFront: boolean; children: ReactNode }) {
  return (
    <div className={isFront ? "is-front" : "is-subpage"}>
      <a className="skip-link" href="#main" dangerouslySetInnerHTML={html(lang, "a11y.skip")} />
      <Header lang={lang} page={page} isFront={isFront} />
      {children}
      <Footer lang={lang} />
    </div>
  );
}

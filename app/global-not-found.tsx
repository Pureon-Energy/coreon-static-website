import type { Metadata } from "next";
import RootHtml from "@/components/RootHtml";
import Shell from "@/components/Shell";
import { html, path, t } from "@/lib/i18n";
import { rootMetadata } from "@/lib/layout";
import "./globals.css";

// GitHub Pages serves one 404.html for every unknown address, so it is the Danish version.
export const metadata: Metadata = { ...rootMetadata, title: `${t("da", "notfound.title")} | Coreon`, robots: { index: false } };

export default function GlobalNotFound() {
  const lang = "da";
  return (
    <RootHtml lang={lang}>
      <Shell lang={lang} page="" isFront={false}>
        <main id="main" className="subpage notfound">
          <div className="wrap wrap--narrow">
            <p className="notfound__code" aria-hidden="true">404</p>
            <h1 dangerouslySetInnerHTML={html(lang, "notfound.title")} />
            <p className="notfound__lead" dangerouslySetInnerHTML={html(lang, "notfound.p")} />
            <div className="notfound__actions">
              <a className="btn btn--dark" href={path(lang)} dangerouslySetInnerHTML={html(lang, "notfound.home")} />
              <a className="btn btn--primary" href={`${path(lang)}#contact`}>
                <span dangerouslySetInnerHTML={html(lang, "cta.label")} /> <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </Shell>
    </RootHtml>
  );
}

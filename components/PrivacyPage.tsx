import Shell from "@/components/Shell";
import { type Lang, html, path, t } from "@/lib/i18n";
import { jsonLdHtml, organizationJsonLd } from "@/lib/meta";
import { CVR, PLAUSIBLE } from "@/lib/site";

export default function PrivacyPage({ lang }: { lang: Lang }) {
  const body = t(lang, "privacy.body")
    .replace("{cvr}", CVR ? ` (CVR ${CVR})` : "")
    .replace("{analytics}", t(lang, PLAUSIBLE ? "privacy.analytics_on" : "privacy.analytics_off"));

  return (
    <Shell lang={lang} page="privacy" isFront={false}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(organizationJsonLd())} />
      <main id="main" className="subpage">
        <div className="wrap wrap--narrow">
          <a className="back-link" href={path(lang)}>
            &larr; <span dangerouslySetInnerHTML={html(lang, "privacy.back")} />
          </a>
          <h1 dangerouslySetInnerHTML={html(lang, "privacy.title")} />
          <p className="subpage__meta" dangerouslySetInnerHTML={html(lang, "privacy.updated")} />
          <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </main>
    </Shell>
  );
}

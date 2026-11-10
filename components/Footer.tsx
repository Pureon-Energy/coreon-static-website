import { type Lang, html, path, t } from "@/lib/i18n";
import { CVR, EMAIL } from "@/lib/site";
import Logo from "./Logo";

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <a className="brand" href={path(lang)}>
              <Logo />
            </a>
            <p dangerouslySetInnerHTML={html(lang, "footer.tagline")} />
          </div>
          <ul className="site-footer__contact">
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li dangerouslySetInnerHTML={html(lang, "contact.address")} />
          </ul>
        </div>
        <div className="site-footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} Coreon ApS{CVR ? <> <span aria-hidden="true">·</span> CVR {CVR}</> : null}. <span dangerouslySetInnerHTML={html(lang, "footer.rights")} />
          </p>
          <p>
            <a href={path(lang, "privacy")} dangerouslySetInnerHTML={html(lang, "footer.privacy")} /> <span aria-hidden="true">·</span> <a href="#main" dangerouslySetInnerHTML={{ __html: `${t(lang, "footer.top")} &uarr;` }} />
          </p>
        </div>
      </div>
    </footer>
  );
}

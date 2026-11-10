import { type Lang, type Page, html, path, t } from "@/lib/i18n";
import { LOGIN_URL } from "@/lib/site";
import LangSwitch from "./LangSwitch";
import Logo from "./Logo";

export default function Header({ lang, page, isFront }: { lang: Lang; page: Page; isFront: boolean }) {
  const home = isFront ? "" : path(lang);
  return (
    <header className="site-header" data-header>
      <div className="wrap wrap--wide site-header__inner">
        <a className="brand" href={path(lang)}>
          <Logo />
        </a>

        <nav className="primary-nav" id="primary-nav" aria-label={t(lang, "a11y.menu")} data-nav>
          <ul>
            <li><a href={`${home}#how`} dangerouslySetInnerHTML={html(lang, "nav.how")} /></li>
            <li><a href={`${home}#results`} dangerouslySetInnerHTML={html(lang, "nav.results")} /></li>
            <li><a href={`${home}#process`} dangerouslySetInnerHTML={html(lang, "nav.process")} /></li>
            <li><a href={`${home}#team`} dangerouslySetInnerHTML={html(lang, "nav.team")} /></li>
            <li><a href={`${home}#faq`} dangerouslySetInnerHTML={html(lang, "nav.faq")} /></li>
          </ul>
          <a className="nav-login" href={LOGIN_URL} target="_blank" rel="noopener noreferrer" title={t(lang, "nav.login")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            <span className="nav-login__label" dangerouslySetInnerHTML={html(lang, "nav.login")} />
          </a>
          <a className="btn btn--primary btn--sm primary-nav__cta" href={`${home}#contact`} dangerouslySetInnerHTML={html(lang, "cta.label")} />
          <LangSwitch lang={lang} page={page} className="lang-switch--menu" />
        </nav>

        <div className="site-header__actions">
          <a className="btn btn--primary btn--sm header-cta" href={`${home}#contact`}>
            <span className="header-cta__long" dangerouslySetInnerHTML={html(lang, "cta.label")} />
            <span className="header-cta__short" aria-hidden="true" dangerouslySetInnerHTML={html(lang, "cta.short")} />
          </a>
          <LangSwitch lang={lang} page={page} className="lang-switch--bar" />
          <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle>
            <span className="screen-reader-text" dangerouslySetInnerHTML={html(lang, "a11y.menu")} />
            <span className="menu-toggle__bars" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

import type { CSSProperties } from "react";
import ContactForm from "@/components/ContactForm";
import Shell from "@/components/Shell";
import { CHART, chartData, chartGeometry } from "@/lib/chart";
import { type Lang, asset, html, t } from "@/lib/i18n";
import { faqJsonLd, jsonLdHtml, organizationJsonLd } from "@/lib/meta";
import { EMAIL } from "@/lib/site";

const STEPS: Record<number, [number, number]> = { 1: [1100, 825], 2: [976, 732], 3: [977, 733] };

const d = (n: number) => ({ "--d": n }) as CSSProperties;

export default function FrontPage({ lang }: { lang: Lang }) {
  const h = (key: string) => html(lang, key);
  const img = asset("/assets/img/");

  const chart = chartData();
  const g = chartGeometry(chart);
  const { w: cw, h: ch, left, right, top, bottom } = CHART;
  const bw = (right - left) / 24;

  return (
    <Shell lang={lang} page="" isFront>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(organizationJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(faqJsonLd(lang))} />

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__media" aria-hidden="true">
            <img
              src={`${img}hero.webp`}
              srcSet={`${img}hero-800.webp 854w, ${img}hero.webp 1707w`}
              sizes="100vw"
              alt=""
              width={1707}
              height={1314}
              fetchPriority="high"
            />
          </div>
          <div className="wrap wrap--wide hero__inner">
            <div className="hero__main">
              <p className="eyebrow eyebrow--dark reveal">
                <span className="pulse" aria-hidden="true" />
                <span dangerouslySetInnerHTML={h("hero.eyebrow")} />
              </p>
              <h1 id="hero-title" className="hero__title reveal" dangerouslySetInnerHTML={h("hero.h1")} />
            </div>
            <div className="hero__side">
              <p className="hero__lead reveal" dangerouslySetInnerHTML={h("hero.p1")} />
              <div className="hero__actions reveal">
                <a className="btn btn--primary" href="#contact">
                  <span dangerouslySetInnerHTML={h("cta.label")} /> <span aria-hidden="true">&rarr;</span>
                </a>
                <a className="btn btn--ghost" href="#how" dangerouslySetInnerHTML={h("hero.cta2")} />
              </div>
            </div>
          </div>
          <div className="wrap wrap--wide">
            <dl className="stats">
              {[1, 2, 3].map((i) => (
                <div className="stats__item" key={i}>
                  <dt dangerouslySetInnerHTML={h(`stats.s${i}`)} />
                  <dd>{t(lang, `stats.v${i}`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section section--paper" id="how" aria-labelledby="how-title">
          <div className="wrap">
            <header className="section-head reveal">
              <p className="eyebrow" dangerouslySetInnerHTML={h("how.head")} />
              <h2 id="how-title" dangerouslySetInnerHTML={h("how.h2")} />
            </header>
            <ul className="features">
              {Array.from({ length: 12 }, (_, k) => k + 1).map((i) => (
                <li className="reveal" style={d((i - 1) % 3)} key={i}>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <circle cx="10" cy="10" r="10" />
                    <path d="M5.8 10.3l2.7 2.7 5.8-6.1" />
                  </svg>
                  <span dangerouslySetInnerHTML={h(`how.f${i}`)} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--dark" id="results" aria-labelledby="chart-title">
          <div className="wrap chart-layout">
            <div className="chart-copy reveal">
              <p className="eyebrow eyebrow--dark" dangerouslySetInnerHTML={h("chart.head")} />
              <h2 id="chart-title" dangerouslySetInnerHTML={h("chart.h3")} />
              <p dangerouslySetInnerHTML={h("chart.p")} />
              <ul className="legend">
                <li><span className="legend__swatch legend__swatch--before" /><span dangerouslySetInnerHTML={h("chart.before")} /></li>
                <li><span className="legend__swatch legend__swatch--after" /><span dangerouslySetInnerHTML={h("chart.after")} /></li>
                <li><span className="legend__swatch legend__swatch--price" /><span dangerouslySetInnerHTML={h("chart.price")} /></li>
              </ul>
              <p className="chart-note" dangerouslySetInnerHTML={h("chart.note")} />
              <div className="inline-cta inline-cta--dark">
                <p dangerouslySetInnerHTML={h("cta.after_chart")} />
                <a className="btn btn--primary" href="#contact">
                  <span dangerouslySetInnerHTML={h("cta.label")} /> <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            <figure className="chart reveal" data-chart>
              <div className="chart__badge">
                <span className="chart__badge-value">{chart.saved}%</span>
                <span dangerouslySetInnerHTML={h("chart.saved")} />
              </div>
              <svg viewBox={`0 0 ${cw} ${ch}`} role="img" aria-labelledby="chart-svg-title">
                <title id="chart-svg-title">{t(lang, "chart.title")}</title>
                <g className="chart__grid">
                  {[0, 1, 2, 3, 4].map((k) => {
                    const yy = top + ((bottom - top) * k) / 4;
                    return <line key={k} x1={left} x2={right} y1={yy} y2={yy} />;
                  })}
                </g>
                <g className="chart__price">
                  {chart.price.map((p, hr) => {
                    const bh = (90 * p) / g.priceMax;
                    return (
                      <rect
                        key={hr}
                        x={Math.round((left + bw * hr + 3) * 10) / 10}
                        y={Math.round((bottom - bh) * 10) / 10}
                        width={Math.round((bw - 6) * 10) / 10}
                        height={Math.round(bh * 10) / 10}
                        rx="2"
                      />
                    );
                  })}
                </g>
                <path className="chart__area" d={`${g.line(chart.after)} L${right},${bottom} L${left},${bottom} Z`} />
                <clipPath id="chart-above-after">
                  <path d={`${g.line(chart.after)} L${right},${top} L${left},${top} Z`} />
                </clipPath>
                <path className="chart__savings" clipPath="url(#chart-above-after)" d={g.gap(chart.before, chart.after)} />
                <path className="chart__line chart__line--before" pathLength={1} d={g.line(chart.before)} />
                <path className="chart__line chart__line--after" pathLength={1} d={g.line(chart.after)} />
                <circle className="chart__dot chart__dot--before" r="5" cx={right} cy={g.y(chart.before[chart.before.length - 1])} />
                <circle className="chart__dot chart__dot--after" r="5" cx={right} cy={g.y(chart.after[chart.after.length - 1])} />
                <g className="chart__axis">
                  {[0, 6, 12, 18, 24].map((hr) => (
                    <text key={hr} x={g.x(hr, 24)} y={ch - 10} textAnchor={hr === 0 ? "start" : hr === 24 ? "end" : "middle"}>
                      {String(hr % 24).padStart(2, "0")}:00
                    </text>
                  ))}
                </g>
              </svg>
            </figure>
          </div>
        </section>

        <section className="section section--paper" id="approach" aria-labelledby="approach-title">
          <div className="wrap approach">
            <div className="approach__visual reveal" aria-hidden="true">
              <svg viewBox="0 0 400 400" className="hub">
                <g className="hub__links">
                  <path d="M200 200 L70 90" /><path d="M200 200 L330 90" /><path d="M200 200 L70 310" /><path d="M200 200 L330 310" />
                </g>
                <g className="hub__nodes">
                  <rect x="15.4" y="35.4" width="109.2" height="109.2" rx="25" /><rect x="275.4" y="35.4" width="109.2" height="109.2" rx="25" />
                  <rect x="15.4" y="255.4" width="109.2" height="109.2" rx="25" /><rect x="275.4" y="255.4" width="109.2" height="109.2" rx="25" />
                </g>
                <g className="hub__icons">
                  <g transform="translate(33.71 53.71) scale(3.024)"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5M3.6 11.2l3.4.8-1 3.3M20.4 12.8 17 12l1-3.3" /></g>
                  <g transform="translate(293.71 53.71) scale(3.024)"><rect x="7" y="2.5" width="10" height="16" rx="3" /><path d="M9 18.5V21M15 18.5V21M12 15c-1.5 0-2.4-1-2.4-2.3 0-1.5 1.4-2.4 2.4-4.2 1 1.8 2.4 2.7 2.4 4.2 0 1.3-.9 2.3-2.4 2.3z" /></g>
                  <g transform="translate(33.71 273.71) scale(3.024)"><rect x="2.5" y="4" width="19" height="16" rx="2.5" /><circle cx="12" cy="12" r="5.5" /><path d="M12 12c0-2.6 1.2-4 3.2-3.6M12 12c2.2 1.3 2.8 3 1.2 4.4M12 12c-2.2 1.2-4 .9-4.4-1" /></g>
                  <g transform="translate(293.71 273.71) scale(3.024)"><rect x="4" y="3" width="10" height="18" rx="2" /><path d="M10 7.5 8 11.5h3l-2 4M14 9.5h2a2 2 0 0 1 2 2v4.5a1.5 1.5 0 0 0 3 0V8l-2-2" /></g>
                </g>
                <circle className="hub__ring hub__ring--pulse" cx="200" cy="200" r="58" />
                <circle className="hub__core" cx="200" cy="200" r="58" />
                <circle className="hub__ring" cx="200" cy="200" r="30" />
                <circle className="hub__dot" cx="200" cy="200" r="10" />
                <g className="hub__labels">
                  <text x="70" y="165">{t(lang, "approach.machine")} 1</text>
                  <text x="330" y="165">{t(lang, "approach.machine")} 2</text>
                  <text x="70" y="385">{t(lang, "approach.machine")} 3</text>
                  <text x="330" y="385">{t(lang, "approach.machine")} 4</text>
                  <text className="hub__brand" x="200" y="286">Coreon</text>
                </g>
              </svg>
            </div>
            <div className="approach__copy">
              <header className="section-head section-head--left reveal">
                <p className="eyebrow" dangerouslySetInnerHTML={h("approach.head")} />
                <h2 id="approach-title" dangerouslySetInnerHTML={h("approach.h2")} />
                <p className="section-head__lead" dangerouslySetInnerHTML={h("approach.p")} />
              </header>
              <ol className="points">
                {[1, 2, 3, 4].map((i) => (
                  <li className="reveal" style={d(i)} key={i}>
                    <h3 dangerouslySetInnerHTML={h(`approach.r${i}h`)} />
                    <p dangerouslySetInnerHTML={h(`approach.r${i}p`)} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="wrap">
            <div className="inline-cta reveal">
              <p dangerouslySetInnerHTML={h("cta.after_approach")} />
              <a className="btn btn--dark" href="#contact">
                <span dangerouslySetInnerHTML={h("cta.label")} /> <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section section--surface" id="process" aria-labelledby="process-title">
          <div className="wrap">
            <header className="section-head reveal">
              <p className="eyebrow" dangerouslySetInnerHTML={h("journey.head")} />
              <h2 id="process-title" dangerouslySetInnerHTML={h("journey.h2")} />
            </header>
            <ol className="steps">
              {[1, 2, 3].map((i) => (
                <li className="step reveal" key={i}>
                  <figure className="step__media">
                    <img src={`${img}step-${i}.webp`} alt="" loading="lazy" decoding="async" width={STEPS[i][0]} height={STEPS[i][1]} />
                  </figure>
                  <div className="step__body">
                    <span className="step__num">0{i}</span>
                    <h3 dangerouslySetInnerHTML={h(`journey.s${i}h`)} />
                    <p dangerouslySetInnerHTML={h(`journey.s${i}p`)} />
                    <p className="step__takeaway" dangerouslySetInnerHTML={h(`journey.s${i}t`)} />
                  </div>
                </li>
              ))}
            </ol>
            <h3 className="journey__outro reveal" dangerouslySetInnerHTML={h("journey.outro")} />
            <div className="inline-cta reveal">
              <p dangerouslySetInnerHTML={h("cta.after_process")} />
              <a className="btn btn--dark" href="#contact">
                <span dangerouslySetInnerHTML={h("cta.label")} /> <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section section--paper team" id="team" aria-labelledby="team-title">
          <div className="wrap">
            <header className="section-head reveal">
              <p className="eyebrow" dangerouslySetInnerHTML={h("team.head")} />
              <h2 id="team-title" dangerouslySetInnerHTML={h("team.h2")} />
              <p className="section-head__lead" dangerouslySetInnerHTML={h("team.p")} />
            </header>
            <div className="team__points">
              {[1, 2, 3].map((i) => (
                <div className="reveal" style={d(i)} key={i}>
                  <h3 dangerouslySetInnerHTML={h(`team.k${i}h`)} />
                  <p dangerouslySetInnerHTML={h(`team.k${i}p`)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--paper" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq">
            <header className="section-head section-head--left reveal">
              <p className="eyebrow" dangerouslySetInnerHTML={h("faq.head")} />
              <h2 id="faq-title" dangerouslySetInnerHTML={h("faq.h2")} />
              <div className="faq__cta">
                <p dangerouslySetInnerHTML={h("faq.cta")} />
                <a className="btn btn--dark" href="#contact">
                  <span dangerouslySetInnerHTML={h("cta.label")} /> <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </header>
            <div className="faq__list reveal">
              {[1, 2, 3, 4, 5].map((i) => (
                <details className="faq__item" open={i === 1} key={i}>
                  <summary>
                    <span dangerouslySetInnerHTML={h(`faq.q${i}`)} />
                    <span className="faq__icon" aria-hidden="true" />
                  </summary>
                  <div className="faq__answer">
                    <p dangerouslySetInnerHTML={h(`faq.a${i}`)} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact__grid">
            <div className="contact__copy reveal">
              <p className="eyebrow eyebrow--dark" dangerouslySetInnerHTML={h("contact.head")} />
              <h2 id="contact-title" dangerouslySetInnerHTML={h("contact.h2")} />
              <p className="contact__lead" dangerouslySetInnerHTML={h("contact.p")} />
              <dl className="contact__details">
                <div>
                  <dt dangerouslySetInnerHTML={h("contact.email")} />
                  <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
                </div>
              </dl>
              <p className="contact__outro" dangerouslySetInnerHTML={h("contact.outro")} />
            </div>

            <ContactForm lang={lang} />
          </div>
        </section>
      </main>
    </Shell>
  );
}

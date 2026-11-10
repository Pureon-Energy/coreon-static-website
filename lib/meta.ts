import type { Metadata } from "next";
import { type Lang, type Page, absUrl, t } from "./i18n";
import { CVR, EMAIL, LINKEDIN, SITE_URL } from "./site";

export function pageMetadata(lang: Lang, page: Page): Metadata {
  const privacy = page === "privacy";
  const title = `${t(lang, privacy ? "privacy.title" : "meta.title")} | Coreon`;
  const description = t(lang, privacy ? "privacy.description" : "meta.description");
  return {
    title,
    description,
    alternates: {
      canonical: absUrl(lang, page),
      languages: { da: absUrl("da", page), en: absUrl("en", page), "x-default": absUrl("da", page) },
    },
    openGraph: {
      type: "website",
      siteName: "Coreon",
      locale: lang === "en" ? "en_GB" : "da_DK",
      title,
      description,
      url: absUrl(lang, page),
      images: [{ url: `${SITE_URL}/assets/img/og-${lang}.jpg`, width: 1200, height: 630, alt: t(lang, "meta.og_alt") }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Coreon",
    legalName: "Coreon ApS",
    url: SITE_URL + "/",
    logo: SITE_URL + "/assets/img/apple-touch-icon.png",
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nørrebrogade 47, 2.",
      postalCode: "2200",
      addressLocality: "København N",
      addressCountry: "DK",
    },
    ...(CVR ? { vatID: "DK" + CVR } : {}),
    ...(LINKEDIN ? { sameAs: [LINKEDIN] } : {}),
  };
}

export function faqJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: [1, 2, 3, 4, 5].map((i) => ({
      "@type": "Question",
      name: t(lang, `faq.q${i}`),
      acceptedAnswer: { "@type": "Answer", text: t(lang, `faq.a${i}`) },
    })),
  };
}

export function jsonLdHtml(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

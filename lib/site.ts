// Full public address including any sub-path, e.g. https://coreon.dk or https://user.github.io/coreon
export const SITE_URL = (process.env.SITE_URL || "https://coreon.dk").replace(/\/+$/, "");

// Sub-path the site is served from on GitHub Pages ("" on a custom domain, "/repo-name" otherwise).
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

// Optional form service (e.g. Formspree). Without it the form opens the visitor's email app instead.
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

export const EMAIL = "hello@coreon.dk";
export const LOGIN_URL = "https://coreoniot-admin-d350f919d0ac7.wittyglacier-32ddcebe.northeurope.azurecontainerapps.io";

/*
 * Fill these in before launch. Each one is optional and switches its output on when set.
 * CVR:       8 digits, shown in the footer, privacy policy and structured data.
 * LINKEDIN:  company page URL, used in structured data.
 * PLAUSIBLE: the domain registered in Plausible (e.g. "coreon.dk"), loads cookieless analytics.
 */
export const CVR = "";
export const LINKEDIN = "";
export const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";

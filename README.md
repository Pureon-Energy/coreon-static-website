# Coreon website (GitHub Pages version)

A static build of the Coreon one-pager, ready for GitHub Pages. It looks and behaves like the WordPress site and keeps the same URLs: `/`, `/en/`, `/privatliv/`, `/en/privacy/`, plus `/sitemap.xml`, `/robots.txt` and `/llms.txt`.

This is a temporary version. The full Next.js version with a server-side contact form lives in `coreon-next/`.

## Publish on GitHub Pages

1. Create a repository and push this folder to the `main` branch.
2. In the repository, go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push (or run the workflow under **Actions**). The site is built and published automatically by `.github/workflows/deploy.yml`.

The site then lives at `https://<user-or-org>.github.io/<repo>/`. The workflow detects that sub-path by itself.

### Custom domain (coreon.dk)

1. In **Settings > Pages**, enter the domain under **Custom domain** and tick **Enforce HTTPS**.
2. At the DNS provider, point the domain to GitHub Pages as described in GitHub's documentation ("Managing a custom domain for your GitHub Pages site").
3. Run the workflow again so links and canonical URLs use the new address.

### Private repository

GitHub Pages from a private repository requires a paid GitHub plan (Pro, Team or Enterprise). Keep the repository private while the hero image's rights are unresolved (see below).

## Contact form

GitHub Pages cannot run server code, so the form works in one of two ways:

- **No setup (default):** pressing "Ring mig op" opens the visitor's email app with a pre-filled message to hello@coreon.dk.
- **With a form service:** create a form at a service such as Formspree, then add its URL as a repository variable named `FORM_ENDPOINT` (**Settings > Secrets and variables > Actions > Variables**). The form then sends in the background and shows the usual confirmation. Choose a service with EU data handling and update the privacy policy, since it becomes a data processor.

Optional: set a variable `PLAUSIBLE_DOMAIN` to switch on cookieless analytics.

## Run locally

Requires Node.js 22.

```
npm install
npm run dev        # development server at http://localhost:3000
npm run build      # static site in ./out
```

## Where things live

| What | File |
|---|---|
| All texts (Danish and English) | `lib/strings.json` |
| Email, login link, CVR, LinkedIn | `lib/site.ts` |
| Front page sections | `components/FrontPage.tsx` |
| Privacy page | `components/PrivacyPage.tsx` |
| Contact form | `components/ContactForm.tsx` |
| Header, footer, logo | `components/` |
| Styles | `app/globals.css` (fonts in `components/RootHtml.tsx`) |
| Images and fonts | `public/assets/` |
| Page routes | `app/(da)/` and `app/(en)/en/` |
| 404 page | `app/global-not-found.tsx` |

## Limitations compared with the server version

- One 404 page for all unknown addresses, in Danish.
- The contact form needs a form service or falls back to the visitor's email app.
- Old addresses like `/da/` or `/privacy/` are not redirected.

## Before launch

- Fill in `CVR` and `LINKEDIN` in `lib/site.ts`.
- Decide on the contact form (form service or email app).
- The hero image is based on an architectural visualisation whose rights are not yet cleared. Replace it or get permission before going live.

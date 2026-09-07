# coreon-onepager

A minimal, static single-page site (`index.html` + `style.css`, no build step, no
framework). Deployed to GitHub Pages via
[`.github/workflows/pages-onepager.yml`](../.github/workflows/pages-onepager.yml)
on every push to `main` that touches this directory.

See [documentation/prds/github-pages-onepager.md](../documentation/prds/github-pages-onepager.md)
for the acceptance contract, open items, and verification steps.

## Preview locally

```bash
cd coreon-onepager
python -m http.server 8000
```

Then open http://localhost:8000.

"use client";

import { useEffect } from "react";

// Port of the theme's assets/js/main.js: sticky header, mobile menu, form memory and reveal animations.
export default function SiteScripts() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-header]");
    const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    if (!header || !toggle || !nav) return;

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const setMenu = (open: boolean) => {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    const onToggle = () => setMenu(toggle.getAttribute("aria-expanded") !== "true");
    const onNavClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a")) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    };
    toggle.addEventListener("click", onToggle);
    nav.addEventListener("click", onNavClick);
    document.addEventListener("keydown", onKey);

    // Keep what the visitor typed if the server rejects the submission; wiped once it succeeds.
    const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
    const onSubmit = () => {
      if (!form) return;
      const data: Record<string, string> = {};
      FIELDS.forEach((f) => (data[f] = (form.elements.namedItem(f) as HTMLInputElement).value));
      try {
        sessionStorage.setItem(FORM_KEY, JSON.stringify(data));
      } catch {}
    };
    if (form) {
      const status = new URLSearchParams(location.search).get("sent");
      try {
        if (status === "ok") {
          sessionStorage.removeItem(FORM_KEY);
        } else if (status) {
          const saved = JSON.parse(sessionStorage.getItem(FORM_KEY) || "{}");
          FIELDS.forEach((f) => {
            if (saved[f]) (form.elements.namedItem(f) as HTMLInputElement).value = saved[f];
          });
        }
      } catch {}
      form.addEventListener("submit", onSubmit);
    }

    const items = document.querySelectorAll(".reveal, [data-chart]");
    let io: IntersectionObserver | undefined;
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io!.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
      );
      items.forEach((el) => io!.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      toggle.removeEventListener("click", onToggle);
      nav.removeEventListener("click", onNavClick);
      document.removeEventListener("keydown", onKey);
      form?.removeEventListener("submit", onSubmit);
      io?.disconnect();
    };
  }, []);

  return null;
}

const FORM_KEY = "coreon-form";
const FIELDS = ["name", "company", "email", "phone", "message"];

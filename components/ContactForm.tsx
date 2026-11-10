"use client";

import { type FormEvent, useState } from "react";
import { type Lang, path, t } from "@/lib/i18n";
import { EMAIL, FORM_ENDPOINT } from "@/lib/site";

type Status = "ok" | "error" | "mail" | null;

// Shown when there is no form service and the message goes out through the visitor's own email app.
const MAIL_NOTE: Record<Lang, string> = {
  da: "Dit mailprogram åbner med beskeden. Tryk send, så ringer vi jer op inden for én arbejdsdag.",
  en: "Your email app opens with the message. Press send and we will call you back within one business day.",
};

export default function ContactForm({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never see or fill this field.
    if (data.get("website")) {
      setStatus("ok");
      form.reset();
      return;
    }

    if (FORM_ENDPOINT) {
      setBusy(true);
      try {
        const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("ok");
        form.reset();
      } catch {
        setStatus("error");
      } finally {
        setBusy(false);
      }
      return;
    }

    const get = (k: string) => String(data.get(k) ?? "").trim();
    const body = [`Navn: ${get("name")}`, `Virksomhed: ${get("company")}`, `Telefon: ${get("phone")}`, `E-mail: ${get("email")}`, `Sprog: ${lang.toUpperCase()}`, "", get("message")].join("\n");
    const subject = `${t(lang, "mail.subject")}: ${get("name")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mail");
  }

  return (
    <form className="form reveal" id="contact-form" method="post" action={FORM_ENDPOINT || `mailto:${EMAIL}`} onSubmit={onSubmit} data-contact-form>
      {status === "ok" ? <p className="form__status form__status--ok" role="status" dangerouslySetInnerHTML={{ __html: t(lang, "form.ok") }} /> : null}
      {status === "mail" ? <p className="form__status form__status--ok" role="status">{MAIL_NOTE[lang]}</p> : null}
      {status === "error" ? <p className="form__status form__status--error" role="alert" dangerouslySetInnerHTML={{ __html: t(lang, "form.error") }} /> : null}

      <input type="hidden" name="lang" value={lang} />
      <div className="form__hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form__row">
        <label className="field">
          <span>{t(lang, "form.name")} *</span>
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span>{t(lang, "form.company")}</span>
          <input type="text" name="company" autoComplete="organization" />
        </label>
      </div>
      <div className="form__row">
        <label className="field">
          <span>{t(lang, "form.email")} *</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
        <label className="field">
          <span>{t(lang, "form.phone")} *</span>
          <input type="tel" name="phone" required autoComplete="tel" />
        </label>
      </div>
      <label className="field">
        <span>{t(lang, "form.message")}</span>
        <textarea name="message" rows={3} />
      </label>
      <p className="form__required" dangerouslySetInnerHTML={{ __html: t(lang, "form.required") }} />
      <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
        <span dangerouslySetInnerHTML={{ __html: t(lang, "form.send") }} /> <span aria-hidden="true">&rarr;</span>
      </button>
      <p className="form__promise" dangerouslySetInnerHTML={{ __html: t(lang, "form.promise") }} />
      <p className="form__note" dangerouslySetInnerHTML={{ __html: t(lang, "form.consent").replace("%s", path(lang, "privacy")) }} />
    </form>
  );
}

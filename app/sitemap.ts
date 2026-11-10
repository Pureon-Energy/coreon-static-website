import type { MetadataRoute } from "next";
import { LANGS, type Page, absUrl } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Page[] = ["", "privacy"];
  return pages.flatMap((page) =>
    LANGS.map((lang) => ({
      url: absUrl(lang, page),
      alternates: { languages: { da: absUrl("da", page), en: absUrl("en", page) } },
    })),
  );
}

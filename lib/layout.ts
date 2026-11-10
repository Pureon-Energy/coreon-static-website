import type { Metadata, Viewport } from "next";
import { asset } from "./i18n";
import { SITE_URL } from "./site";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  icons: {
    icon: [
      { url: asset("/assets/img/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/assets/img/favicon-32.png"), sizes: "32x32", type: "image/png" },
    ],
    apple: asset("/assets/img/apple-touch-icon.png"),
  },
};

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B140F",
};

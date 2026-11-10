import type { ReactNode } from "react";
import RootHtml from "@/components/RootHtml";
import { rootMetadata, rootViewport } from "@/lib/layout";
import "../globals.css";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}

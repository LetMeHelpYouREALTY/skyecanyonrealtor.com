import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

function canonicalUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  if (path === "/" || path === "") {
    return base;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withoutTrailing = normalized.endsWith("/")
    ? normalized.slice(0, -1)
    : normalized;
  return `${base}${withoutTrailing}`;
}

/** Per-page title + self-referencing canonical on the apex site URL. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const url = canonicalUrl(path);
  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
    },
  };
}

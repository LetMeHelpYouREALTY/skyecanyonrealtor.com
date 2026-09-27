/** Apex is primary for skyecanyonrealtor.com (www → apex 308 on Vercel). */
export const SITE_HOST = "skyecanyonrealtor.com";

const DEFAULT_SITE_URL = `https://${SITE_HOST}`;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_SITE_URL;
}

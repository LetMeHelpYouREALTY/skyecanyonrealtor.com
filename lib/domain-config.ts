/**
 * Single-site configuration for skyecanyonrealtor.com.
 * Hard-wired so *.vercel.app previews render Skye Canyon agent content.
 */

export interface DomainConfig {
  domain: string;
  neighborhood: string;
  tagline: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  keywords: string[];
  pageType: "community" | "search" | "lifestyle" | "investment" | "55plus" | "luxury";
  realscoutAgentId: string;
  ctaBadge: string;
  ctaHeadline: string;
  ctaSubheadline: string;
}

const REALSCOUT_AGENT_ID = "QWdlbnQtMjI1MDUw";

export const SITE_DOMAIN = "skyecanyonrealtor.com";

export const SINGLE_SITE_CONFIG: DomainConfig = {
  domain: SITE_DOMAIN,
  neighborhood: "Skye Canyon",
  tagline: "Skye Canyon Real Estate Agent",
  description:
    "Skye Canyon real estate agent Dr. Jan Duffy helps buyers and sellers with agent-led representation in Northwest Las Vegas. Call (702) 222-1964.",
  heroHeadline: "Skye Canyon Real Estate Agent Dr. Jan Duffy",
  heroSubheadline:
    "Agent-led representation for Skye Canyon buyers and sellers. Dr. Jan Duffy, REALTOR®, guides you through listings, new construction, and resale opportunities.",
  keywords: [
    "Skye Canyon real estate agent",
    "Dr. Jan Duffy Skye Canyon",
    "Skye Canyon buyer representation",
    "Skye Canyon listing agent",
  ],
  pageType: "community",
  realscoutAgentId: REALSCOUT_AGENT_ID,
  ctaBadge: "Skye Canyon Agent",
  ctaHeadline: "Talk With Dr. Jan Duffy",
  ctaSubheadline:
    "Get clear guidance on Skye Canyon listings, builder incentives, and resale opportunities.",
};

/** @deprecated Use SINGLE_SITE_CONFIG — kept for imports from the multi-domain tree. */
export const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  [SITE_DOMAIN]: SINGLE_SITE_CONFIG,
};

export const DEFAULT_CONFIG: DomainConfig = SINGLE_SITE_CONFIG;

export function getDomainConfig(_hostname: string): DomainConfig {
  return SINGLE_SITE_CONFIG;
}

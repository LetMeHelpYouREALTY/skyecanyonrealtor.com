/**
 * Compact global hero banner config — shown on every page via root layout.
 * Distinct from full-bleed PageHero (homepage / page-level heroes).
 */

export type GlobalHeroConfig = {
  src: string;
  alt: string;
  tagline: string;
  phoneDisplay?: string;
  phoneTel?: string;
};

export const GLOBAL_HERO: GlobalHeroConfig = {
  src: "/images/global-hero/heyberkshire.jpg",
  alt: "Skye Canyon master-planned community and mountain backdrop, Northwest Las Vegas, NV",
  tagline: "Skye Canyon Real Estate Agent — Dr. Jan Duffy, REALTOR®",
  phoneDisplay: "(702) 222-1964",
  phoneTel: "tel:+17022221964",
};

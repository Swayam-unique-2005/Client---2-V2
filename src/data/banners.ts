export interface BannerData {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  bgClass: string; // tailwind classes for background
  textClass?: string;
}

export const banners: BannerData[] = [
  {
    id: "guided-meditation",
    title: "Guided Audio Meditation",
    subtitle: "Find Your Inner Calm. Journey Within.",
    ctaText: "Listen Now",
    ctaLink: "/category/Guided Meditation & Affirmations",
    bgClass: "bg-gradient-to-r from-[hsl(200,25%,25%)] to-[hsl(180,20%,35%)]",
    textClass: "text-white",
  },
  {
    id: "weekend-offer",
    title: "Exclusive Weekend Offer",
    subtitle: "20% OFF on Divine Accessories — Limited Time Only",
    ctaText: "Shop Now",
    ctaLink: "/category/Divine Accessories",
    bgClass: "bg-gradient-to-r from-primary to-accent",
    textClass: "text-primary-foreground",
  },
  {
    id: "rasamani",
    title: "Rasamani",
    subtitle: "Sacred Mercury Bead & Ancient Wisdom",
    ctaText: "Shop Now",
    ctaLink: "/category/Divine Accessories",
    bgClass: "bg-gradient-to-r from-[hsl(25,30%,18%)] to-[hsl(25,40%,28%)]",
    textClass: "text-white",
  },
];

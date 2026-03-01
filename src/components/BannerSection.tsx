import { Link } from "react-router-dom";
import type { BannerData } from "@/data/banners";

interface BannerSectionProps {
  banners: BannerData[];
}

export default function BannerSection({ banners }: BannerSectionProps) {
  if (banners.length === 0) return null;

  if (banners.length === 1) {
    const b = banners[0];
    return (
      <section className="container mx-auto px-4 py-6">
        <Link to={b.ctaLink} className="block">
          <div className={`rounded-sm overflow-hidden ${b.bgClass} p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-4 group hover:shadow-elevated transition-shadow duration-300`}>
            <div>
              <h3 className={`font-serif text-xl lg:text-2xl mb-1 ${b.textClass || "text-primary-foreground"}`}>{b.title}</h3>
              <p className={`font-sans text-sm opacity-80 ${b.textClass || "text-primary-foreground"}`}>{b.subtitle}</p>
            </div>
            <span className={`inline-block border rounded-sm px-6 py-2.5 text-xs font-sans font-semibold tracking-[0.1em] uppercase group-hover:-translate-y-0.5 transition-transform ${b.textClass ? `${b.textClass} border-current` : "text-primary-foreground border-primary-foreground/40"}`}>
              {b.ctaText}
            </span>
          </div>
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((b) => (
          <Link key={b.id} to={b.ctaLink} className="block">
            <div className={`rounded-sm overflow-hidden ${b.bgClass} p-6 lg:p-8 flex flex-col justify-between h-full group hover:shadow-elevated transition-shadow duration-300 min-h-[140px]`}>
              <div>
                <h3 className={`font-serif text-lg lg:text-xl mb-1 ${b.textClass || "text-primary-foreground"}`}>{b.title}</h3>
                <p className={`font-sans text-xs opacity-80 mb-3 ${b.textClass || "text-primary-foreground"}`}>{b.subtitle}</p>
              </div>
              <span className={`self-start inline-block border rounded-sm px-5 py-2 text-[10px] font-sans font-semibold tracking-[0.1em] uppercase group-hover:-translate-y-0.5 transition-transform ${b.textClass ? `${b.textClass} border-current` : "text-primary-foreground border-primary-foreground/40"}`}>
                {b.ctaText}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

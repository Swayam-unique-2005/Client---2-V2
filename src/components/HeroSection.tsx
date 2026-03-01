import { Link } from "react-router-dom";
import heroMain from "@/assets/hero-main.jpg";
import heroAromatherapy from "@/assets/hero-aromatherapy.jpg";
import heroRituals from "@/assets/hero-rituals.jpg";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 h-auto lg:h-[520px]">
        {/* Left large banner */}
        <div className="relative overflow-hidden rounded-sm group h-[360px] lg:h-full">
          <img
            src={heroMain}
            alt="Spiritual Awakening Collection"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <p className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-primary-foreground/80 mb-2">
              Spiritual Awakening
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl text-primary-foreground mb-4 leading-tight">
              Discover Inner Peace<br />With Our Collection
            </h2>
            <Link
              to="/category/all"
              className="inline-block bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase px-7 py-3 rounded-sm hover:-translate-y-0.5 transition-transform duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="grid grid-rows-2 gap-4 lg:gap-5 h-[440px] lg:h-full">
          {/* Right top */}
          <div className="relative overflow-hidden rounded-sm group">
            <img
              src={heroAromatherapy}
              alt="Aromatherapy Finds"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
              <p className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-primary-foreground/80 mb-1">
                Aromatherapy Finds
              </p>
              <h3 className="font-serif text-xl text-primary-foreground mb-3">
                Scent Your Sanctuary
              </h3>
              <Link
                to="/category/Pooja Essential"
                className="inline-block bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase px-6 py-2.5 rounded-sm hover:-translate-y-0.5 transition-transform duration-200"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right bottom */}
          <div className="relative overflow-hidden rounded-sm group">
            <img
              src={heroRituals}
              alt="Used in Our Rituals"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
              <p className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-primary-foreground/80 mb-1">
                Used in Our Rituals
              </p>
              <h3 className="font-serif text-xl text-primary-foreground mb-3">
                Focus Your Mind
              </h3>
              <Link
                to="/category/Divine Accessories"
                className="inline-block bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase px-6 py-2.5 rounded-sm hover:-translate-y-0.5 transition-transform duration-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

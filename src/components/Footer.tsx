import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-semibold tracking-[0.06em] mb-4">
              AZHAIKKIRAN MADHAVAN
            </h3>
            <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed">
              Handcrafted spiritual essentials for your sacred journey. Premium quality, mindfully sourced.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.12em] uppercase mb-4 text-primary-foreground/80">Quick Links</h4>
            <ul className="space-y-2">
              {["Shop All", "Pooja Essentials", "Divine Accessories", "Books"].map((link) => (
                <li key={link}>
                  <Link to="/category/all" className="font-sans text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.12em] uppercase mb-4 text-primary-foreground/80">Customer Service</h4>
            <ul className="space-y-2">
              {["Track Order", "Shipping Info", "Returns", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link to="/track-order" className="font-sans text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.12em] uppercase mb-4 text-primary-foreground/80">Stay Connected</h4>
            <p className="font-sans text-sm text-primary-foreground/50 leading-relaxed">
              Follow us on social media for spiritual inspiration and exclusive offers.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="font-sans text-xs text-primary-foreground/40 text-center">
            © {new Date().getFullYear()} Azhaikkiran Madhavan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

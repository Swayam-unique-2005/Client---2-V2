import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, HelpCircle, MapPin, User, ShoppingBag, Heart, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { categories, categoryIcons, getProductsByCategory } from "@/data/products";

const navCategories = categories.filter((c) => c !== "Shop by Category" && c !== "All Categories");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(navCategories[0]);
  const { totalItems, setDrawerOpen } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const subcategories = getProductsByCategory(activeCategory).slice(0, 6);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-card" : ""}`}>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs tracking-[0.15em] uppercase font-sans font-medium">
        FREE SHIPPING ON ALL ORDERS ₹50+
      </div>

      {/* Main header */}
      <div className={`bg-background transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          {/* Mobile menu toggle */}
          <button className="lg:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand */}
          <Link to="/" className="flex-shrink-0">
            <h1 className={`font-serif font-semibold tracking-[0.08em] text-foreground transition-all duration-300 ${scrolled ? "text-lg" : "text-xl lg:text-2xl"}`}>
              AZHAIKKIRAN MADHAVAN
            </h1>
          </Link>

          {/* Search - desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted border-0 rounded-sm py-2.5 pl-4 pr-10 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                <Search size={16} />
              </button>
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <button className="lg:hidden text-foreground" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/track-order" className="hidden md:flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-primary transition-colors">
              <MapPin size={14} /><span>Track Order</span>
            </Link>
            <Link to="/track-order" className="hidden md:flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-primary transition-colors">
              <HelpCircle size={14} /><span>Help</span>
            </Link>
            <Link to="/wishlist" className="hidden md:flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-primary transition-colors">
              <User size={14} /><span>My Account</span>
            </Link>
            <Link to="/wishlist" className="relative text-foreground hover:text-primary transition-colors" aria-label="Wishlist">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => setDrawerOpen(true)} className="relative text-foreground hover:text-primary transition-colors" aria-label="Cart">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3 pt-2">
            <form onSubmit={handleSearch} className="relative">
              <input type="text" placeholder="What are you looking for?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus className="w-full bg-muted border-0 rounded-sm py-2.5 pl-4 pr-10 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Search size={16} /></button>
            </form>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="bg-background hairline-bottom hidden lg:block" ref={megaRef}>
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3">
            {/* Shop by Category trigger */}
            <li className="relative">
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                onMouseEnter={() => { clearTimeout(megaTimeout.current); setMegaOpen(true); }}
                onMouseLeave={() => { megaTimeout.current = setTimeout(() => setMegaOpen(false), 200); }}
                className="flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.08em] uppercase text-foreground hover:text-primary transition-colors bg-primary/10 px-4 py-1.5 rounded-sm"
                aria-expanded={megaOpen}
                aria-haspopup="true"
              >
                Shop by Category <ChevronDown size={12} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega menu */}
              {megaOpen && (
                <div
                  className="absolute top-full left-0 mt-2 bg-background border border-border rounded-sm shadow-elevated w-[650px] grid grid-cols-5 animate-fade-in z-50"
                  onMouseEnter={() => clearTimeout(megaTimeout.current)}
                  onMouseLeave={() => { megaTimeout.current = setTimeout(() => setMegaOpen(false), 200); }}
                >
                  {/* Left: categories */}
                  <div className="col-span-2 border-r border-border py-3">
                    {navCategories.map((cat) => (
                      <button
                        key={cat}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => { navigate(`/category/${encodeURIComponent(cat)}`); setMegaOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-sans text-left transition-colors ${
                          activeCategory === cat ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <span className="text-base">{categoryIcons[cat] || "📦"}</span>
                        <span className="flex-1">{cat}</span>
                        <ChevronRight size={12} />
                      </button>
                    ))}
                    <div className="hairline mx-4 my-2" />
                    <Link
                      to="/category/all"
                      onClick={() => setMegaOpen(false)}
                      className="block px-4 py-2 text-xs font-sans font-semibold text-primary hover:underline"
                    >
                      View All Products →
                    </Link>
                  </div>

                  {/* Right: subcategory products */}
                  <div className="col-span-3 p-4">
                    <p className="text-xs font-sans font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-3">{activeCategory}</p>
                    <div className="space-y-2">
                      {subcategories.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.id}`}
                          onClick={() => setMegaOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-sm hover:bg-muted/50 transition-colors group/item"
                        >
                          <div className="w-10 h-10 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-sans text-xs text-foreground line-clamp-1 group-hover/item:text-primary transition-colors">{p.name}</p>
                            <p className="font-sans text-[10px] text-primary font-semibold">₹{p.price.toLocaleString("en-IN")}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to={`/category/${encodeURIComponent(activeCategory)}`}
                      onClick={() => setMegaOpen(false)}
                      className="inline-block mt-3 text-xs font-sans font-semibold text-primary hover:underline"
                    >
                      View all {activeCategory} →
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {navCategories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/category/${encodeURIComponent(cat)}`}
                  className="text-xs font-sans font-medium tracking-[0.08em] uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/category/all" className="text-xs font-sans font-medium tracking-[0.08em] uppercase text-muted-foreground hover:text-primary transition-colors">
                All Categories
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <ul className="px-4 py-4 space-y-3">
            {navCategories.map((cat) => (
              <li key={cat}>
                <Link to={`/category/${encodeURIComponent(cat)}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors">
                  <span>{categoryIcons[cat] || "📦"}</span> {cat}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/category/all" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-sans font-medium text-primary">
                All Categories
              </Link>
            </li>
            <li className="pt-2 hairline">
              <Link to="/track-order" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-sans text-muted-foreground py-1">Track Order</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

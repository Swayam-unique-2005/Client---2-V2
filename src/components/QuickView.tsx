import { useState, useEffect, useRef } from "react";
import { X, Heart, Minus, Plus, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface QuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function QuickView({ product, open, onClose }: QuickViewProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && product) {
      setQty(1);
      setAdded(false);
      setSelectedVariant(product.type === "variable" && product.variants ? product.variants[0].label : undefined);
    }
  }, [open, product]);

  // Trap focus + ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  const wishlisted = isWishlisted(product.id);
  const currentPrice = selectedVariant && product.variants
    ? product.variants.find((v) => v.label === selectedVariant)?.price ?? product.price
    : product.price;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stars = product.rating ?? 4.5;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
    >
      <div
        ref={contentRef}
        className="bg-background rounded-sm shadow-elevated w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto relative animate-scale-in"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
          aria-label="Close quick view"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="bg-muted aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2">{product.category}</p>
            <h2 className="font-serif text-xl lg:text-2xl text-foreground mb-2 leading-tight">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className={s <= Math.round(stars) ? "fill-accent text-accent" : "text-border"} />
                ))}
              </div>
              <span className="text-xs font-sans text-muted-foreground">{product.reviewCount ?? 0} Reviews</span>
            </div>

            <p className="font-serif text-xl text-primary mb-4">
              ₹{currentPrice.toLocaleString("en-IN")}
            </p>

            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{product.description}</p>

            {/* Variants */}
            {product.type === "variable" && product.variants && (
              <div className="mb-5">
                <p className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">Options</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.label}
                      onClick={() => setSelectedVariant(v.label)}
                      className={`px-3 py-1.5 text-xs font-sans rounded-sm border transition-colors ${
                        selectedVariant === v.label
                          ? "border-primary bg-primary/10 text-primary font-semibold"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {v.label} — ₹{v.price.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-muted-foreground">Qty</span>
              <div className="flex items-center border border-border rounded-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-4 font-sans text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase py-3 rounded-sm hover:-translate-y-0.5 transition-transform duration-200"
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-11 border rounded-sm flex items-center justify-center transition-colors ${
                  wishlisted ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                }`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={16} className={wishlisted ? "fill-current" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

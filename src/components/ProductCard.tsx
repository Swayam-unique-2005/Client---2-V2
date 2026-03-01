import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import QuickView from "./QuickView";

interface ProductCardProps {
  product: Product;
  showCta?: boolean;
}

export default function ProductCard({ product, showCta = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const priceDisplay = product.priceMax
    ? `₹${product.price.toLocaleString("en-IN")} – ₹${product.priceMax.toLocaleString("en-IN")}`
    : `₹${product.price.toLocaleString("en-IN")}`;

  const handleCta = () => {
    if (product.type === "simple") {
      addToCart(product);
      toast.success(`${product.name} added to cart`, { duration: 2000 });
    } else {
      setQuickViewOpen(true);
    }
  };

  return (
    <>
      <div className="group relative">
        {/* Image */}
        <div className="relative overflow-hidden rounded-sm bg-muted aspect-square mb-3">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </Link>

          {/* Hover overlay icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={14} className={wishlisted ? "fill-primary text-primary" : "text-foreground"} />
            </button>
            <button
              onClick={() => setQuickViewOpen(true)}
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Quick view"
            >
              <Eye size={14} className="text-foreground" />
            </button>
          </div>

          {/* Hover CTA overlay */}
          {showCta && (
            <button
              onClick={handleCta}
              className="absolute bottom-0 left-0 right-0 bg-primary/95 text-primary-foreground text-xs font-sans font-semibold tracking-[0.08em] uppercase py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200 text-center"
            >
              {product.type === "simple" ? "Add to Cart" : "Select options"}
            </button>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-sans text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="font-sans text-sm font-semibold text-primary">{priceDisplay}</p>
        </div>
      </div>

      <QuickView product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );
}

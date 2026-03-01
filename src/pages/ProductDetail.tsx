import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, Minus, Plus, ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductById, getRelatedProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProductPage } from "@/contexts/ProductPageContext";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { setProductPage, clearProductPage } = useProductPage();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(() => {
    if (product?.type === "variable" && product.variants) return product.variants[0].label;
    return undefined;
  });

  const currentPrice = selectedVariant && product?.variants
    ? product.variants.find((v) => v.label === selectedVariant)?.price ?? product.price
    : product?.price ?? 0;

  // Sync product page state to context for StickyMiniCart
  useEffect(() => {
    if (product) {
      setProductPage({ product, selectedVariant, qty, currentPrice });
    }
    return () => clearProductPage();
  }, [product, selectedVariant, qty, currentPrice, setProductPage, clearProductPage]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/" className="text-primary font-sans text-sm underline">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const priceDisplay = product.type === "variable" && product.priceMax
    ? `₹${product.price.toLocaleString("en-IN")} – ₹${product.priceMax.toLocaleString("en-IN")}`
    : `₹${product.price.toLocaleString("en-IN")}`;

  const related = getRelatedProducts(product.id, 4);
  const stars = product.rating ?? 4.5;

  const handleAddToCart = () => {
    if (product.type === "variable" && !selectedVariant) {
      toast.error("Please select an option first");
      return;
    }
    for (let i = 0; i < qty; i++) addToCart(product, selectedVariant);
    setAdded(true);
    toast.success(`${product.name} added to cart`, { duration: 2000 });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="bg-muted rounded-sm overflow-hidden aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">
              {product.category}
            </p>
            <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={s <= Math.round(stars) ? "fill-accent text-accent" : "text-border"} />
                ))}
              </div>
              <span className="text-xs font-sans text-muted-foreground">{product.reviewCount ?? 0} Reviews</span>
            </div>

            <p className="font-serif text-xl lg:text-2xl text-primary mb-2">
              {selectedVariant && product.variants
                ? `₹${currentPrice.toLocaleString("en-IN")}`
                : priceDisplay}
            </p>

            <div className="hairline mb-6" />

            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Variants */}
            {product.type === "variable" && product.variants && (
              <div className="mb-6">
                <p className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2">Options</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.label}
                      onClick={() => setSelectedVariant(v.label)}
                      className={`px-4 py-2 text-xs font-sans rounded-sm border transition-colors ${selectedVariant === v.label
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

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-muted-foreground">Qty</span>
              <div className="flex items-center border border-border rounded-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-4 font-sans text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase py-3.5 rounded-sm hover:-translate-y-0.5 transition-transform duration-200"
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 border rounded-sm flex items-center justify-center transition-colors ${wishlisted ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                  }`}
                aria-label="Wishlist"
              >
                <Heart size={16} className={wishlisted ? "fill-current" : ""} />
              </button>
            </div>

            <div className="hairline mt-8 mb-4" />
            <p className="text-xs font-sans text-muted-foreground">
              Free shipping on orders over ₹50 • Easy returns
            </p>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-border" />
              <h2 className="font-serif text-xl text-foreground text-center whitespace-nowrap">You may also like</h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

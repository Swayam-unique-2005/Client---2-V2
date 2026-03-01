import { useState, useEffect } from "react";
import { ShoppingBag, ChevronRight, ChevronDown, Minus, Plus } from "lucide-react";
import { useCart, getCartKey } from "@/contexts/CartContext";
import { useProductPage } from "@/contexts/ProductPageContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function StickyMiniCart() {
  const { items, totalItems, totalPrice, setDrawerOpen, addToCart, updateQuantity } = useCart();
  const { product: pageProduct, selectedVariant: pageVariant, qty: pageQty, currentPrice: pagePrice, setProductPage } = useProductPage();
  const [visible, setVisible] = useState(false);

  // Local state for banner variant/qty (mirrors page context but adds local control)
  const [bannerVariant, setBannerVariant] = useState<string | undefined>(pageVariant);
  const [bannerQty, setBannerQty] = useState(pageQty || 1);

  // Keep banner state in sync with product page context
  useEffect(() => {
    setBannerVariant(pageVariant);
    setBannerQty(pageQty || 1);
  }, [pageVariant, pageQty]);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isOnProductPage = !!pageProduct;
  const hasCartItems = totalItems > 0;

  // Determine banner price based on local variant selection
  const bannerPrice = (() => {
    if (!pageProduct) return 0;
    if (bannerVariant && pageProduct.variants) {
      return pageProduct.variants.find((v) => v.label === bannerVariant)?.price ?? pageProduct.price;
    }
    return pageProduct.price;
  })();

  // Sync local variant/qty back to context so ProductDetail can use it
  useEffect(() => {
    if (pageProduct && (bannerVariant !== pageVariant || bannerQty !== pageQty)) {
      setProductPage({ product: pageProduct, selectedVariant: bannerVariant, qty: bannerQty, currentPrice: bannerPrice });
    }
  }, [bannerVariant, bannerQty, bannerPrice, pageProduct, pageVariant, pageQty, setProductPage]);

  // Check if this exact product+variant is already in cart
  const cartKey = pageProduct ? (bannerVariant ? `${pageProduct.id}::${bannerVariant}` : pageProduct.id) : "";
  const existingCartItem = items.find((i) => getCartKey(i) === cartKey);

  const handleBannerAddToCart = () => {
    if (!pageProduct) return;
    if (pageProduct.type === "variable" && !bannerVariant) {
      toast.error("Please select an option first");
      return;
    }
    if (existingCartItem) {
      // Update qty instead of adding duplicate
      updateQuantity(cartKey, existingCartItem.quantity + bannerQty);
      toast.success(`Updated ${pageProduct.name} quantity`, { duration: 2000 });
    } else {
      for (let i = 0; i < bannerQty; i++) addToCart(pageProduct, bannerVariant);
      toast.success(`${pageProduct.name} added to cart`, { duration: 2000 });
    }
  };

  // On product page with empty cart: always show product banner (no scroll gate)
  // On product page with items: show cart summary after scroll
  // On other pages with items: show cart summary after scroll
  // On other pages without items: hide

  if (!isOnProductPage && !hasCartItems) return null;
  if (isOnProductPage && !hasCartItems) {
    // Product page, cart empty → show product info banner (always visible)
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[80] bg-card shadow-elevated hairline animate-fade-in">
        <div className="container mx-auto flex items-center justify-between gap-3 max-w-5xl px-4 py-2.5">
          {/* Product thumbnail + name */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink">
            <div className="w-10 h-10 rounded-sm overflow-hidden bg-muted flex-shrink-0">
              <img src={pageProduct.image} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="font-sans text-xs font-medium text-foreground line-clamp-1 hidden sm:block">{pageProduct.name}</p>
          </div>

          {/* Variant selector */}
          {pageProduct.type === "variable" && pageProduct.variants && (
            <div className="relative flex-shrink-0">
              <select
                value={bannerVariant || ""}
                onChange={(e) => setBannerVariant(e.target.value)}
                className="appearance-none bg-background border border-border rounded-sm text-xs font-sans px-3 py-2 pr-7 text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {pageProduct.variants.map((v) => (
                  <option key={v.label} value={v.label}>
                    {v.label} – ₹{v.price.toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          )}

          {/* Price (for simple products) */}
          {pageProduct.type === "simple" && (
            <span className="font-sans text-xs font-semibold text-primary flex-shrink-0">
              ₹{bannerPrice.toLocaleString("en-IN")}
            </span>
          )}

          {/* Qty stepper */}
          <div className="flex items-center border border-border rounded-sm flex-shrink-0">
            <button onClick={() => setBannerQty(Math.max(1, bannerQty - 1))} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Minus size={12} />
            </button>
            <span className="px-2.5 font-sans text-xs font-medium text-foreground min-w-[20px] text-center">{bannerQty}</span>
            <button onClick={() => setBannerQty(bannerQty + 1)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Plus size={12} />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleBannerAddToCart}
            className="bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.08em] uppercase px-5 py-2.5 rounded-sm hover:-translate-y-0.5 transition-transform flex-shrink-0"
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
  }

  // Cart has items → existing behavior (show after scroll)
  if (!visible) return null;

  const thumbnails = items.slice(0, 3);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] bg-card shadow-elevated hairline px-4 py-2.5 animate-fade-in">
      <div className="container mx-auto flex items-center justify-between gap-4 max-w-5xl">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {thumbnails.map((item, i) => (
              <div key={i} className="w-8 h-8 rounded-full overflow-hidden border-2 border-background bg-muted">
                <img src={item.product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {items.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-sans font-semibold text-muted-foreground">
                +{items.length - 3}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-sans font-medium text-foreground">{totalItems} item{totalItems > 1 ? "s" : ""}</p>
            <p className="text-xs font-sans font-semibold text-primary">₹{totalPrice.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1 text-xs font-sans text-muted-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag size={14} /> View Cart
          </button>
          <Link
            to="/checkout"
            className="bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.08em] uppercase px-5 py-2 rounded-sm hover:-translate-y-0.5 transition-transform flex items-center gap-1"
          >
            Checkout <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart, getCartKey } from "@/contexts/CartContext";
import { useEffect, useRef } from "react";
import CouponSection from "@/components/CouponSection";
import CartDiscovery from "@/components/CartDiscovery";
import BillBreakdown from "@/components/BillBreakdown";

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, isDrawerOpen, setDrawerOpen } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, setDrawerOpen]);

  if (!isDrawerOpen) return null;

  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const freeShippingReached = totalPrice >= FREE_SHIPPING_THRESHOLD;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] bg-foreground/30 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === overlayRef.current) setDrawerOpen(false); }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-elevated flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 hairline-bottom">
          <h2 className="font-serif text-lg text-foreground flex items-center gap-2">
            <ShoppingBag size={18} /> Shopping Cart
          </h2>
          <button onClick={() => setDrawerOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free shipping bar */}
        <div className="px-5 py-3 bg-muted/50">
          <p className="text-xs font-sans text-muted-foreground mb-1.5">
            {freeShippingReached
              ? "🎉 You've unlocked free shipping!"
              : `Spend ₹${(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString("en-IN")} more to get Free Shipping`
            }
          </p>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* Cart Items */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-5">
              <ShoppingBag size={40} className="text-muted-foreground mb-3" />
              <p className="font-sans text-sm text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="px-5 py-3 space-y-4">
              {items.map((item) => {
                const key = getCartKey(item);
                return (
                  <div key={key} className="flex gap-3 items-start">
                    <Link to={`/product/${item.product.id}`} onClick={() => setDrawerOpen(false)} className="w-16 h-16 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs font-medium text-foreground line-clamp-1">{item.product.name}</p>
                      {item.selectedVariant && (
                        <p className="text-[10px] font-sans text-muted-foreground">{item.selectedVariant}</p>
                      )}
                      <p className="font-sans text-xs font-semibold text-primary mt-0.5">₹{item.unitPrice.toLocaleString("en-IN")}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQuantity(key, item.quantity - 1)} className="w-6 h-6 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground text-xs">
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-sans font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(key, item.quantity + 1)} className="w-6 h-6 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground text-xs">
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(key)} className="text-muted-foreground hover:text-destructive transition-colors mt-1" aria-label="Remove item">
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Coupons section */}
          {items.length > 0 && <CouponSection />}

          {/* Discovery tabs: Hot Choices / Similar Products */}
          <CartDiscovery />
        </div>

        {/* Footer with Bill Breakdown */}
        {items.length > 0 && (
          <div className="p-5 hairline bg-card">
            <BillBreakdown />
            <div className="flex gap-2 mt-4">
              <Link
                to="/cart"
                onClick={() => setDrawerOpen(false)}
                className="flex-1 text-center border border-primary text-primary text-xs font-sans font-semibold tracking-[0.08em] uppercase py-3 rounded-sm hover:-translate-y-0.5 transition-transform"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="flex-1 text-center bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.08em] uppercase py-3 rounded-sm hover:-translate-y-0.5 transition-transform"
              >
                Check Out
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

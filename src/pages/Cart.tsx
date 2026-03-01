import { Link } from "react-router-dom";
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart, getCartKey } from "@/contexts/CartContext";
import BillBreakdown from "@/components/BillBreakdown";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="font-serif text-2xl text-foreground mb-2">Your cart is empty</h1>
          <p className="font-sans text-sm text-muted-foreground mb-6">Discover our handcrafted spiritual collection.</p>
          <Link to="/" className="inline-block bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase px-8 py-3 rounded-sm hover:-translate-y-0.5 transition-transform">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
        <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-0">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-3 hairline-bottom text-xs font-sans font-medium tracking-[0.1em] uppercase text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => {
              const key = getCartKey(item);
              return (
                <div key={key} className="grid grid-cols-12 gap-4 py-6 hairline-bottom items-center">
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <Link to={`/product/${item.product.id}`} className="w-20 h-20 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <Link to={`/product/${item.product.id}`} className="font-sans text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
                        {item.product.name}
                      </Link>
                      {item.selectedVariant && (
                        <p className="text-xs text-muted-foreground">{item.selectedVariant}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">{item.product.category}</p>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-border rounded-sm">
                      <button onClick={() => updateQuantity(key, item.quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground">
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm font-sans font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(key, item.quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2 text-right font-sans text-sm text-muted-foreground">
                    ₹{item.unitPrice.toLocaleString("en-IN")}
                  </div>

                  <div className="col-span-5 md:col-span-2 flex items-center justify-end gap-3">
                    <span className="font-sans text-sm font-semibold text-foreground">
                      ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                    </span>
                    <button onClick={() => removeFromCart(key)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-sm p-6 shadow-card sticky top-32">
              <h2 className="font-serif text-lg text-foreground mb-4">Order Summary</h2>
              <BillBreakdown />
              <div className="mt-4">
                <Link
                  to="/checkout"
                  className="block w-full bg-primary text-primary-foreground text-center text-xs font-sans font-semibold tracking-[0.12em] uppercase py-3.5 rounded-sm hover:-translate-y-0.5 transition-transform"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

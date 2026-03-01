import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart, getCartKey } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrderContext";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Nothing to checkout</h1>
          <Link to="/" className="text-primary font-sans text-sm underline">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.length < 10) errs.phone = "Valid phone number is required";
    if (!form.address.trim()) errs.address = "Shipping address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const orderId = placeOrder(items, totalPrice, form);
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Cart
        </Link>
        <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <h2 className="font-serif text-lg text-foreground mb-2">Shipping Information</h2>

            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-sans font-medium tracking-[0.08em] uppercase text-muted-foreground mb-1.5">
                  {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
                </label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-muted border-0 rounded-sm py-2.5 px-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-xs font-sans font-medium tracking-[0.08em] uppercase text-muted-foreground mb-1.5">
                Shipping Address
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={3}
                className="w-full bg-muted border-0 rounded-sm py-2.5 px-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
              />
              {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase py-3.5 rounded-sm hover:-translate-y-0.5 transition-transform mt-4"
            >
              Place Order — ₹{totalPrice.toLocaleString("en-IN")}
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="bg-card rounded-sm p-6 shadow-card">
              <h2 className="font-serif text-lg text-foreground mb-4">Your Order</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={getCartKey(item)} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-xs text-foreground line-clamp-1">{item.product.name}</p>
                      {item.selectedVariant && <p className="font-sans text-[10px] text-muted-foreground">{item.selectedVariant}</p>}
                      <p className="font-sans text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-sans text-xs font-semibold text-foreground whitespace-nowrap">
                      ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="hairline my-4" />
              <div className="flex justify-between font-sans text-sm font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

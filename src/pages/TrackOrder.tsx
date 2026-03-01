import { useState } from "react";
import { Package, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useOrders } from "@/contexts/OrderContext";

export default function TrackOrder() {
  const { getLastOrder, getOrderById } = useOrders();
  const [searchId, setSearchId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<ReturnType<typeof getOrderById>>(undefined);
  const [searched, setSearched] = useState(false);
  const lastOrder = getLastOrder();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedOrder(getOrderById(searchId.trim()));
    setSearched(true);
  };

  const order = searched ? searchedOrder : lastOrder;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12 max-w-xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Shop
        </Link>
        <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-6">Track Your Order</h1>

        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. AM-...)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 bg-muted border-0 rounded-sm py-2.5 px-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
          <button type="submit" className="bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase px-6 py-2.5 rounded-sm hover:-translate-y-0.5 transition-transform">
            Track
          </button>
        </form>

        {order ? (
          <div className="bg-card rounded-sm p-6 shadow-card">
            <div className="flex items-start gap-4 mb-4">
              <Package size={24} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-lg text-foreground">{order.id}</h2>
                <p className="text-xs font-sans text-muted-foreground mt-0.5">
                  Placed on {new Date(order.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>
            <div className="hairline mb-4" />
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-muted-foreground">Status</span>
              <span className="text-xs font-sans font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                  <span className="text-foreground font-medium">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="hairline my-3" />
            <div className="flex justify-between font-sans text-sm font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Package size={40} className="mx-auto text-muted-foreground mb-3" />
            <p className="font-sans text-sm text-muted-foreground">
              {searched ? "No order found with that ID." : "No orders yet. Place your first order!"}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

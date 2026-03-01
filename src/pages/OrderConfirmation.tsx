import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useOrders } from "@/contexts/OrderContext";

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId || "");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 lg:py-24 max-w-lg text-center">
        <CheckCircle size={56} className="mx-auto text-primary mb-6" />
        <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-3">Order Placed!</h1>
        {order ? (
          <>
            <p className="font-sans text-sm text-muted-foreground mb-2">
              Your order <span className="font-semibold text-foreground">{order.id}</span> has been placed successfully.
            </p>
            <p className="font-sans text-sm text-muted-foreground mb-8">
              Total: <span className="font-semibold text-primary">₹{order.total.toLocaleString("en-IN")}</span>
            </p>
          </>
        ) : (
          <p className="font-sans text-sm text-muted-foreground mb-8">
            Order ID: <span className="font-semibold text-foreground">{orderId}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/track-order"
            className="inline-block border border-primary text-primary text-xs font-sans font-semibold tracking-[0.12em] uppercase px-8 py-3 rounded-sm hover:-translate-y-0.5 transition-transform"
          >
            Track Order
          </Link>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.12em] uppercase px-8 py-3 rounded-sm hover:-translate-y-0.5 transition-transform"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

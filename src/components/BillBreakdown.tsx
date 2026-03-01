import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const SHIPPING_FEE = 50;
const FREE_SHIPPING_THRESHOLD = 50;
const GST_RATE = 0.18;

export default function BillBreakdown() {
    const { items, totalPrice, appliedCoupon } = useCart();
    const [expanded, setExpanded] = useState(false);

    if (items.length === 0) return null;

    // Calculate MRP total (same as item total since we don't have separate MRP)
    const itemTotal = totalPrice;

    // Coupon discount
    const couponDiscount = appliedCoupon?.discount ?? 0;

    // Subtotal after discount
    const afterDiscount = itemTotal - couponDiscount;

    // GST (included in price, extracted)
    const gstAmount = Math.round((afterDiscount * GST_RATE) / (1 + GST_RATE));

    // Shipping
    const freeShipping = afterDiscount >= FREE_SHIPPING_THRESHOLD;
    const shippingFee = freeShipping ? 0 : SHIPPING_FEE;

    // Final total
    const finalTotal = afterDiscount + shippingFee;

    // Total savings
    const totalSavings = couponDiscount + (freeShipping && afterDiscount >= FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0);

    return (
        <div className="font-sans text-sm">
            {/* Summary row - always visible */}
            <div className="flex justify-between items-center font-semibold mb-1">
                <span className="text-foreground">Total</span>
                <span className="text-primary">₹{finalTotal.toLocaleString("en-IN")}</span>
            </div>

            {/* Toggle button */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-primary font-medium hover:underline transition-colors w-full justify-end mb-2"
            >
                {expanded ? "Hide" : "Show"} Breakdown
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            {/* Expanded breakdown */}
            {expanded && (
                <div className="space-y-2 pt-2 border-t border-border animate-fade-in">
                    <div className="flex justify-between text-muted-foreground">
                        <span>Item Total (MRP)</span>
                        <span>₹{itemTotal.toLocaleString("en-IN")}</span>
                    </div>
                    {couponDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                        <span>GST (included)</span>
                        <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Delivery Charges</span>
                        <span>
                            {freeShipping ? (
                                <span><s className="text-muted-foreground/50">₹{SHIPPING_FEE}</s> <span className="text-green-600 font-medium">FREE</span></span>
                            ) : (
                                `₹${shippingFee}`
                            )}
                        </span>
                    </div>
                    {totalSavings > 0 && (
                        <>
                            <div className="hairline" />
                            <div className="flex justify-between text-green-600 font-semibold">
                                <span>Total Savings</span>
                                <span>₹{totalSavings.toLocaleString("en-IN")} Saving</span>
                            </div>
                        </>
                    )}
                    <div className="hairline" />
                    <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Final amount <span className="text-muted-foreground font-normal">(Tax Included)</span></span>
                        <span className="text-primary">₹{finalTotal.toLocaleString("en-IN")}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useState } from "react";
import { Copy, Check, Tag, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { availableCoupons, calculateDiscount, type Coupon } from "@/data/coupons";
import { toast } from "sonner";

export default function CouponSection() {
    const { totalPrice, appliedCoupon, applyCoupon, removeCoupon } = useCart();
    const [inputCode, setInputCode] = useState("");
    const [error, setError] = useState("");
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleApply = (code: string) => {
        setError("");
        const coupon = availableCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
        if (!coupon) {
            setError("Invalid coupon code");
            return;
        }
        if (totalPrice < coupon.minOrder) {
            setError(`Minimum order of ₹${coupon.minOrder} required`);
            return;
        }
        const discount = calculateDiscount(coupon, totalPrice);
        applyCoupon({ code: coupon.code, discount, description: coupon.description });
        setInputCode("");
        toast.success(`Coupon ${coupon.code} applied! You save ₹${discount.toLocaleString("en-IN")}`);
    };

    const handleCopy = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            toast.success("Coupon code copied!");
            setTimeout(() => setCopiedCode(null), 2000);
        } catch {
            toast.error("Failed to copy");
        }
    };

    return (
        <div className="px-5 py-4">
            <div className="hairline mb-4" />
            <h3 className="font-serif text-sm text-foreground mb-3 flex items-center gap-2">
                <Tag size={14} className="text-primary" /> Available Offers
                {availableCoupons.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-[10px] font-sans font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {availableCoupons.length}
                    </span>
                )}
            </h3>

            {/* Applied coupon banner */}
            {appliedCoupon && (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-sm px-3 py-2 mb-3">
                    <div className="flex items-center gap-2">
                        <Check size={14} className="text-green-600" />
                        <span className="font-sans text-xs font-semibold text-green-700">{appliedCoupon.code}</span>
                        <span className="font-sans text-xs text-green-600">-₹{appliedCoupon.discount.toLocaleString("en-IN")}</span>
                    </div>
                    <button onClick={removeCoupon} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Input field */}
            {!appliedCoupon && (
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => { setInputCode(e.target.value.toUpperCase()); setError(""); }}
                        placeholder="Enter coupon code"
                        className="flex-1 border border-border rounded-sm px-3 py-2 text-xs font-sans bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                        onClick={() => handleApply(inputCode)}
                        disabled={!inputCode.trim()}
                        className="bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.06em] uppercase px-4 py-2 rounded-sm hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        Apply
                    </button>
                </div>
            )}
            {error && <p className="text-xs font-sans text-destructive mb-3">{error}</p>}

            {/* Available coupons list */}
            {!appliedCoupon && (
                <div className="space-y-2">
                    {availableCoupons.map((coupon) => (
                        <div key={coupon.code} className="border border-border rounded-sm p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <p className="font-sans text-xs font-semibold text-foreground">{coupon.description}</p>
                                    <ul className="mt-1 space-y-0.5">
                                        <li className="font-sans text-[10px] text-muted-foreground">• Minimum purchase of ₹{coupon.minOrder}</li>
                                        {coupon.constraints && (
                                            <li className="font-sans text-[10px] text-muted-foreground">• {coupon.constraints}</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="border border-dashed border-primary/50 rounded-sm px-3 py-1 font-sans text-xs font-bold text-primary tracking-[0.06em]">
                                    {coupon.code}
                                </span>
                                <button
                                    onClick={() => handleCopy(coupon.code)}
                                    className="flex items-center gap-1 border border-border rounded-sm px-2.5 py-1 text-[10px] font-sans font-semibold text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                                >
                                    {copiedCode === coupon.code ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                                </button>
                                <button
                                    onClick={() => handleApply(coupon.code)}
                                    className="border border-primary rounded-sm px-2.5 py-1 text-[10px] font-sans font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

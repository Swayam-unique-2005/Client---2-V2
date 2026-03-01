import { useState, useEffect, useRef, useMemo } from "react";
import { X, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getRelatedProducts, getProductById, type Product } from "@/data/products";

export default function AddonsModal() {
    const { items, addToCart, lastAddedProductId, isAddonsModalOpen, setAddonsModalOpen } = useCart();
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const overlayRef = useRef<HTMLDivElement>(null);

    // Get the product that was just added
    const addedProduct = lastAddedProductId ? getProductById(lastAddedProductId) : null;

    // Get add-on suggestions — memoized per lastAddedProductId
    const addons = useMemo(() => {
        if (!lastAddedProductId) return [];
        const cartIds = new Set(items.map((i) => i.product.id));
        return getRelatedProducts(lastAddedProductId, 8).filter(
            (p) => !cartIds.has(p.id) && p.type === "simple"
        ).slice(0, 6);
    }, [lastAddedProductId, items]);

    // Reset selection when modal opens
    useEffect(() => {
        if (isAddonsModalOpen) setSelected(new Set());
    }, [isAddonsModalOpen]);

    // ESC to close
    useEffect(() => {
        if (!isAddonsModalOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setAddonsModalOpen(false); };
        document.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [isAddonsModalOpen, setAddonsModalOpen]);

    if (!isAddonsModalOpen) return null;

    const toggleSelect = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleAddSelected = () => {
        addons
            .filter((p) => selected.has(p.id))
            .forEach((p) => {
                // Temporarily prevent modal re-triggering by closing first
                addToCart(p);
            });
        setAddonsModalOpen(false);
    };

    const handleSkip = () => {
        setAddonsModalOpen(false);
    };

    const selectedTotal = addons
        .filter((p) => selected.has(p.id))
        .reduce((sum, p) => sum + p.price, 0);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={(e) => { if (e.target === overlayRef.current) setAddonsModalOpen(false); }}
        >
            <div className="bg-background rounded-lg shadow-elevated w-full max-w-sm max-h-[85vh] flex flex-col animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between p-5 pb-3">
                    <div>
                        <h2 className="font-serif text-base text-foreground">Top Add-Ons for This Product</h2>
                        <p className="text-[10px] font-sans text-muted-foreground mt-0.5">These are already added together — don't miss out</p>
                    </div>
                    <button
                        onClick={handleSkip}
                        className="text-muted-foreground hover:text-foreground transition-colors -mt-1"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Success badge */}
                {addedProduct && (
                    <div className="px-5 pb-3">
                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-sm px-3 py-2">
                            <Check size={14} className="text-green-600 flex-shrink-0" />
                            <p className="text-[11px] font-sans text-green-700 line-clamp-1">
                                <span className="font-semibold">{addedProduct.name}</span> added to cart
                            </p>
                        </div>
                    </div>
                )}

                {/* Scrollable list of add-ons */}
                <div className="flex-1 overflow-y-auto px-5 pb-3">
                    {addons.length > 0 ? (
                        <div className="space-y-2">
                            {addons.map((p) => {
                                const isSelected = selected.has(p.id);
                                return (
                                    <label
                                        key={p.id}
                                        className={`flex items-center gap-3 p-3 rounded-sm border cursor-pointer transition-all ${isSelected
                                                ? "border-primary bg-primary/5 shadow-sm"
                                                : "border-border hover:border-primary/40"
                                            }`}
                                        onClick={() => toggleSelect(p.id)}
                                    >
                                        {/* Checkbox */}
                                        <div
                                            className={`w-5 h-5 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isSelected
                                                    ? "bg-primary border-primary text-primary-foreground"
                                                    : "border-border"
                                                }`}
                                        >
                                            {isSelected && <Check size={12} />}
                                        </div>

                                        {/* Thumbnail */}
                                        <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-sans text-xs font-medium text-foreground line-clamp-1">{p.name}</p>
                                            <p className="font-sans text-xs font-semibold text-primary mt-0.5">₹{p.price.toLocaleString("en-IN")}</p>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <ShoppingBag size={28} className="text-muted-foreground mb-2" />
                            <p className="text-xs font-sans text-muted-foreground">No add-ons available</p>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="p-5 pt-3 hairline flex gap-3">
                    <button
                        onClick={handleSkip}
                        className="flex-1 text-center border border-border text-muted-foreground text-xs font-sans font-semibold tracking-[0.06em] uppercase py-3 rounded-sm hover:border-foreground hover:text-foreground transition-colors"
                    >
                        Skip
                    </button>
                    <button
                        onClick={handleAddSelected}
                        disabled={selected.size === 0}
                        className="flex-1 text-center bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.06em] uppercase py-3 rounded-sm hover:-translate-y-0.5 transition-transform disabled:opacity-40 disabled:hover:translate-y-0"
                    >
                        {selected.size > 0
                            ? `Add to Cart (₹${selectedTotal.toLocaleString("en-IN")})`
                            : "Add to Cart"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { Check } from "lucide-react";
import { useCart, getCartKey } from "@/contexts/CartContext";
import { getRelatedProducts, type Product } from "@/data/products";

export default function CartAddons() {
    const { items, addToCart, lastAddedProductId } = useCart();
    const [selected, setSelected] = useState<Set<string>>(new Set());

    // Get add-on suggestions based on last added product
    const sourceId = lastAddedProductId || (items.length > 0 ? items[0].product.id : null);
    if (!sourceId) return null;

    const addons = getRelatedProducts(sourceId, 6).filter(
        (p) => !items.some((i) => i.product.id === p.id)
    );

    if (addons.length === 0) return null;

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
                if (p.type === "simple") addToCart(p);
            });
        setSelected(new Set());
    };

    return (
        <div className="px-5 py-4 bg-muted/30">
            <h3 className="font-serif text-sm text-foreground mb-1">Top Add-Ons for This Product</h3>
            <p className="text-[10px] font-sans text-muted-foreground mb-3">These are already added together — don't miss out</p>

            <div className="space-y-2">
                {addons.map((p) => {
                    const isSelected = selected.has(p.id);
                    const isVariable = p.type === "variable";
                    return (
                        <label
                            key={p.id}
                            className={`flex items-center gap-3 p-2.5 rounded-sm border cursor-pointer transition-colors ${isSelected
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/40"
                                }`}
                        >
                            <button
                                type="button"
                                onClick={() => !isVariable && toggleSelect(p.id)}
                                className={`w-5 h-5 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isSelected
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "border-border"
                                    } ${isVariable ? "opacity-40 cursor-not-allowed" : ""}`}
                                disabled={isVariable}
                            >
                                {isSelected && <Check size={12} />}
                            </button>
                            <div className="w-10 h-10 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-sans text-xs font-medium text-foreground line-clamp-1">{p.name}</p>
                                <p className="font-sans text-xs font-semibold text-primary">₹{p.price.toLocaleString("en-IN")}</p>
                            </div>
                        </label>
                    );
                })}
            </div>

            {selected.size > 0 && (
                <button
                    onClick={handleAddSelected}
                    className="mt-3 w-full bg-primary text-primary-foreground text-xs font-sans font-semibold tracking-[0.08em] uppercase py-2.5 rounded-sm hover:-translate-y-0.5 transition-transform"
                >
                    Add to Cart ({selected.size} item{selected.size > 1 ? "s" : ""})
                </button>
            )}
        </div>
    );
}

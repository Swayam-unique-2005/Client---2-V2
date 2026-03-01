import { useState, useMemo } from "react";
import { Flame, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { products, getRelatedProducts, type Product } from "@/data/products";

export default function CartDiscovery() {
    const { items, addToCart } = useCart();
    const [activeTab, setActiveTab] = useState<"hot" | "similar">("hot");

    // Hot choices: top-selling products by reviewCount, excluding items already in cart
    const hotChoices = useMemo(() => {
        const cartIds = new Set(items.map((i) => i.product.id));
        return products
            .filter((p) => p.section.includes("top-selling") && !cartIds.has(p.id))
            .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
            .slice(0, 6);
    }, [items]);

    // Similar products: based on cart items' categories
    const similarProducts = useMemo(() => {
        const cartIds = new Set(items.map((i) => i.product.id));
        if (items.length === 0) return [];

        // Get related from all cart items, deduplicate
        const seen = new Set<string>();
        const result: Product[] = [];
        for (const item of items) {
            const related = getRelatedProducts(item.product.id, 4);
            for (const p of related) {
                if (!cartIds.has(p.id) && !seen.has(p.id)) {
                    seen.add(p.id);
                    result.push(p);
                }
            }
            if (result.length >= 6) break;
        }
        return result.slice(0, 6);
    }, [items]);

    const currentProducts = activeTab === "hot" ? hotChoices : similarProducts;

    if (hotChoices.length === 0 && similarProducts.length === 0) return null;

    const handleQuickAdd = (p: Product) => {
        if (p.type === "simple") addToCart(p);
    };

    return (
        <div className="px-5 py-4">
            <div className="hairline mb-4" />

            {/* Tabs */}
            <div className="flex gap-1 mb-4 bg-muted/60 rounded-sm p-0.5">
                <button
                    onClick={() => setActiveTab("hot")}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-sans font-semibold tracking-[0.04em] uppercase py-2 rounded-sm transition-colors ${activeTab === "hot"
                            ? "bg-background text-foreground shadow-soft"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Flame size={12} className={activeTab === "hot" ? "text-accent" : ""} />
                    Hot Choices
                </button>
                <button
                    onClick={() => setActiveTab("similar")}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-sans font-semibold tracking-[0.04em] uppercase py-2 rounded-sm transition-colors ${activeTab === "similar"
                            ? "bg-background text-foreground shadow-soft"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Sparkles size={12} className={activeTab === "similar" ? "text-accent" : ""} />
                    Similar Products
                </button>
            </div>

            {/* Products grid */}
            {currentProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5">
                    {currentProducts.map((p) => (
                        <div key={p.id} className="border border-border rounded-sm p-2">
                            <div className="aspect-square bg-muted rounded-sm overflow-hidden mb-1.5">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="font-sans text-[10px] text-foreground line-clamp-1">{p.name}</p>
                            <p className="font-sans text-[10px] font-semibold text-primary">₹{p.price.toLocaleString("en-IN")}</p>
                            <button
                                onClick={() => handleQuickAdd(p)}
                                className="mt-1 w-full text-[9px] font-sans font-semibold tracking-[0.06em] uppercase py-1 border border-primary text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                {p.type === "simple" ? "Quick Add" : "Select Options"}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xs font-sans text-muted-foreground text-center py-4">No products to show</p>
            )}
        </div>
    );
}

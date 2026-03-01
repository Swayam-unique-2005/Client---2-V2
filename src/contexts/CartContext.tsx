import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  unitPrice: number;
}

export interface AppliedCoupon {
  code: string;
  discount: number;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant?: string) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  lastAddedProductId: string | null;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  isAddonsModalOpen: boolean;
  setAddonsModalOpen: (open: boolean) => void;
}

function getCartKey(item: CartItem) {
  return item.selectedVariant ? `${item.product.id}::${item.selectedVariant}` : item.product.id;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("am-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isAddonsModalOpen, setAddonsModalOpen] = useState(false);
  const [lastAddedProductId, setLastAddedProductId] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(() => {
    try {
      const saved = localStorage.getItem("am-coupon");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("am-cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem("am-coupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("am-coupon");
    }
  }, [appliedCoupon]);

  const addToCart = useCallback((product: Product, variant?: string) => {
    const unitPrice = variant && product.variants
      ? (product.variants.find((v) => v.label === variant)?.price ?? product.price)
      : product.price;
    const key = variant ? `${product.id}::${variant}` : product.id;

    setItems((prev) => {
      const existing = prev.find((i) => getCartKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          getCartKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, selectedVariant: variant, unitPrice }];
    });
    setLastAddedProductId(product.id);
    setAddonsModalOpen(true);
  }, []);

  const removeFromCart = useCallback((cartKey: string) => {
    setItems((prev) => prev.filter((i) => getCartKey(i) !== cartKey));
  }, []);

  const updateQuantity = useCallback((cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => getCartKey(i) !== cartKey));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (getCartKey(i) === cartKey ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((coupon: AppliedCoupon) => {
    setAppliedCoupon(coupon);
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, totalPrice, isDrawerOpen, setDrawerOpen,
      lastAddedProductId, appliedCoupon, applyCoupon, removeCoupon,
      isAddonsModalOpen, setAddonsModalOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { getCartKey };

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/data/products";

interface ProductPageState {
  product: Product | null;
  selectedVariant?: string;
  qty: number;
  currentPrice: number;
}

interface ProductPageContextType extends ProductPageState {
  setProductPage: (state: ProductPageState) => void;
  clearProductPage: () => void;
}

const defaultState: ProductPageState = { product: null, qty: 1, currentPrice: 0 };

const ProductPageContext = createContext<ProductPageContextType | undefined>(undefined);

export function ProductPageProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProductPageState>(defaultState);

  const setProductPage = useCallback((s: ProductPageState) => setState(s), []);
  const clearProductPage = useCallback(() => setState(defaultState), []);

  return (
    <ProductPageContext.Provider value={{ ...state, setProductPage, clearProductPage }}>
      {children}
    </ProductPageContext.Provider>
  );
}

export function useProductPage() {
  const ctx = useContext(ProductPageContext);
  if (!ctx) throw new Error("useProductPage must be used within ProductPageProvider");
  return ctx;
}

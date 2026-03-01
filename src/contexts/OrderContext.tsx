import React, { createContext, useContext, useState, useCallback } from "react";
import type { CartItem } from "./CartContext";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
  customer: { name: string; email: string; phone: string; address: string };
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number, customer: Order["customer"]) => string;
  getLastOrder: () => Order | undefined;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("am-orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const placeOrder = useCallback(
    (items: CartItem[], total: number, customer: Order["customer"]) => {
      const id = "AM-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
      const order: Order = {
        id,
        items,
        total,
        date: new Date().toISOString(),
        status: "Processing",
        customer,
      };
      setOrders((prev) => {
        const next = [order, ...prev];
        localStorage.setItem("am-orders", JSON.stringify(next));
        return next;
      });
      return id;
    },
    []
  );

  const getLastOrder = useCallback(() => orders[0], [orders]);
  const getOrderById = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getLastOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}

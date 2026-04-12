import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  qty: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = useCallback((id: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id, qty: 1 }];
    });
    setAddedToCartId(id);
    setTimeout(() => setAddedToCartId(null), 1500);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c)).filter((c) => c.qty > 0));
  }, []);

  return { cart, cartCount, addToCart, removeFromCart, updateQty, addedToCartId };
};

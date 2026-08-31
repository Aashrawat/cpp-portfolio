"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  addProductToCart,
  getCartCount,
  getCartFromStorage,
  getCartTotal,
  removeProductFromCart,
  saveCartToStorage,
  updateProductQuantity,
} from "@/lib/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(getCartFromStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveCartToStorage(items);
  }, [items, ready]);

  function addToCart(product) {
    setItems((current) => addProductToCart(current, product));
  }

  function removeFromCart(productId) {
    setItems((current) => removeProductFromCart(current, productId));
  }

  function changeQuantity(productId, quantity) {
    setItems((current) => updateProductQuantity(current, productId, quantity));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        cartCount: getCartCount(items),
        cartTotal: getCartTotal(items),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

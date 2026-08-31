"use client";

import { CartProvider } from "@/context/CartContext";
import { I18nProvider } from "@/context/I18nContext";

export default function Providers({ children }) {
  return (
    <I18nProvider>
      <CartProvider>{children}</CartProvider>
    </I18nProvider>
  );
}

export const CART_STORAGE_KEY = "nuvio-cart";

export function getCartFromStorage() {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function getCartCount(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(items) {
  return items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
}

export function addProductToCart(items, product) {
  const existing = items.find((item) => item.id === product.id);

  if (existing) {
    return items.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [
    ...items,
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    },
  ];
}

export function removeProductFromCart(items, productId) {
  return items.filter((item) => item.id !== productId);
}

export function updateProductQuantity(items, productId, quantity) {
  if (quantity <= 0) {
    return removeProductFromCart(items, productId);
  }

  return items.map((item) =>
    item.id === productId ? { ...item, quantity } : item
  );
}

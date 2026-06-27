/* ============================================================
   cart.js — Cart state in localStorage ("techmobile_cart")
   Stored shape: [{ id: Number, qty: Number }, ...]
   ============================================================ */

import products from './data.js';

const CART_KEY = 'techmobile_cart';

/* Read raw cart array from storage (defensive parse) */
export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  // Let any listening UI (badges) react.
  window.dispatchEvent(new CustomEvent('cart:change', { detail: { cart } }));
}

/* Add qty of a product (creates or increments) */
export function addToCart(id, qty = 1) {
  id = Number(id);
  qty = Math.max(1, Number(qty) || 1);
  const product = products.find(p => p.id === id);
  const cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }

  // Clamp to available stock if we know the product.
  if (product) {
    const line = cart.find(item => item.id === id);
    line.qty = Math.min(line.qty, product.stock);
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(id) {
  id = Number(id);
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  return cart;
}

export function updateQty(id, qty) {
  id = Number(id);
  qty = Number(qty);
  let cart = getCart();

  if (qty <= 0) {
    cart = cart.filter(item => item.id !== id);
  } else {
    const item = cart.find(i => i.id === id);
    const product = products.find(p => p.id === id);
    if (item) {
      item.qty = product ? Math.min(qty, product.stock) : qty;
    }
  }
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

/* Total number of items (sum of quantities) */
export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/* Total price of all cart lines */
export function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

/* Cart joined with full product objects — handy for rendering */
export function getCartDetailed() {
  return getCart()
    .map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return null;
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

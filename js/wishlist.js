/* ============================================================
   wishlist.js — Wishlist of product IDs ("techmobile_wishlist")
   Stored shape: [Number, Number, ...]
   ============================================================ */

const WISH_KEY = 'techmobile_wishlist';

export function getWishlist() {
  try {
    const raw = localStorage.getItem(WISH_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(Number) : [];
  } catch {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISH_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('wishlist:change', { detail: { list } }));
}

/* Add if absent, remove if present. Returns the new boolean state. */
export function toggleWishlist(id) {
  id = Number(id);
  const list = getWishlist();
  const idx = list.indexOf(id);
  let nowWishlisted;

  if (idx === -1) {
    list.push(id);
    nowWishlisted = true;
  } else {
    list.splice(idx, 1);
    nowWishlisted = false;
  }
  saveWishlist(list);
  return nowWishlisted;
}

export function isWishlisted(id) {
  return getWishlist().includes(Number(id));
}

export function getWishlistCount() {
  return getWishlist().length;
}

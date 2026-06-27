/* ============================================================
   wishlist-page.js — Render the saved (wishlisted) products
   ============================================================ */

import products from './data.js';
import { getWishlist } from './wishlist.js';
import { initUI, productCardHTML, initProductCardActions } from './ui.js';
import { ICON } from './icons.js';

initUI();
initProductCardActions();

const root = document.getElementById('wishlist-root');
const countLabel = document.getElementById('wish-count-label');

function render() {
  const ids = getWishlist();
  const items = ids
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  countLabel.textContent = `(${items.length} saved)`;

  if (items.length === 0) {
    root.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${ICON.heart}</div>
        <h2>Your wishlist is empty</h2>
        <p>Tap the heart on any product to save it here for later.</p>
        <a class="btn btn-primary" href="products.html">Browse Products</a>
      </div>`;
    return;
  }

  root.innerHTML = `<div class="product-grid">${items.map(productCardHTML).join('')}</div>`;
}

/* Re-render when items are added/removed (incl. from the cards on this page) */
window.addEventListener('wishlist:change', render);

render();

/* ============================================================
   detail.js — Render single product, gallery, qty, tabs
   ============================================================ */

import { getProductById } from './data.js';
import { getQueryParams } from './search.js';
import { addToCart } from './cart.js';
import { toggleWishlist, isWishlisted } from './wishlist.js';
import {
  initUI, formatPrice, starString, showToast,
  updateCartBadge, updateWishBadge
} from './ui.js';
import { ICON } from './icons.js';

initUI();

const root = document.getElementById('detail-root');
const { id } = getQueryParams();
const product = getProductById(id);

/* ---- Not found ---- */
if (!product) {
  root.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">${ICON.box}</div>
      <h2>Product not found</h2>
      <p>The item you're looking for doesn't exist or may have been removed.</p>
      <a class="btn btn-primary" href="products.html">Browse Products</a>
    </div>`;
} else {
  document.title = `${product.name} — TechMobile`;
  renderProduct(product);
}

function stockLabel(stock) {
  if (stock === 0) return { cls: 'out', text: 'Out of Stock' };
  if (stock <= 5)  return { cls: 'low', text: `Only ${stock} left in stock` };
  return { cls: 'in', text: `In Stock (${stock})` };
}

function renderProduct(p) {
  const discount = p.originalPrice
    ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const stock = stockLabel(p.stock);
  const wished = isWishlisted(p.id);

  const specRows = Object.entries(p.specs)
    .map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('');

  const thumbs = p.images.map((src, i) => `
    <button class="thumb-btn ${i === 0 ? 'active' : ''}" data-thumb="${i}" aria-label="View image ${i + 1}">
      <img src="${src}" alt="${p.name} view ${i + 1}">
    </button>`).join('');

  root.innerHTML = `
    <div class="detail-grid">
      <div class="gallery">
        <div class="gallery-main">
          <img id="main-image" src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="gallery-thumbs">${thumbs}</div>
      </div>

      <div class="detail-info">
        <span class="detail-category">${p.brand ? p.brand + ' · ' : ''}${p.category}</span>
        <h1 class="detail-title">${p.name}</h1>
        <div class="detail-rating">
          <span class="stars" aria-hidden="true">${starString(p.rating)}</span>
          <span>${p.rating} (${p.reviewCount} reviews)</span>
        </div>
        <div class="detail-price">
          <span class="price">${formatPrice(p.price)}</span>
          ${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="discount">-${discount}%</span>` : ''}
        </div>
        <p class="detail-stock ${stock.cls}">${stock.text}</p>

        <div class="qty-row">
          <span>Qty:</span>
          <div class="qty-control">
            <button id="qty-minus" aria-label="Decrease quantity">−</button>
            <input id="qty-input" type="number" value="1" min="1" max="${p.stock}" aria-label="Quantity">
            <button id="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div class="detail-actions">
          <button class="btn btn-primary add-cart-btn" id="add-cart" ${p.stock === 0 ? 'disabled' : ''}>
            Add to Cart
          </button>
          <button class="btn btn-outline detail-wish-btn ${wished ? 'wished' : ''}" id="wish-btn" aria-pressed="${wished}">
            ${ICON.heart} <span class="wish-label">${wished ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="detail-tabs">
      <div class="tab-buttons" role="tablist">
        <button class="active" data-tab="description" role="tab" aria-selected="true">Description</button>
        <button data-tab="specs" role="tab" aria-selected="false">Specifications</button>
      </div>
      <div class="tab-panel active" id="tab-description" role="tabpanel">
        <p>${p.description}</p>
      </div>
      <div class="tab-panel" id="tab-specs" role="tabpanel">
        <table class="spec-table"><tbody>${specRows}</tbody></table>
      </div>
    </div>`;

  wireGallery(p);
  wireQty(p);
  wireActions(p);
  wireTabs();
}

/* ---- Gallery thumbnail swapping ---- */
function wireGallery(p) {
  const main = document.getElementById('main-image');
  document.querySelectorAll('[data-thumb]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.thumb);
      main.style.opacity = '0';
      setTimeout(() => {
        main.src = p.images[i];
        main.style.opacity = '1';
      }, 150);
      document.querySelectorAll('[data-thumb]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ---- Quantity selector ---- */
function wireQty(p) {
  const input = document.getElementById('qty-input');
  const clamp = () => {
    let v = parseInt(input.value, 10);
    if (isNaN(v) || v < 1) v = 1;
    if (v > p.stock) v = p.stock;
    input.value = v;
  };
  document.getElementById('qty-minus').addEventListener('click', () => {
    input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    input.value = Math.min(p.stock, (parseInt(input.value, 10) || 1) + 1);
  });
  input.addEventListener('change', clamp);
}

/* ---- Add to cart + wishlist ---- */
function wireActions(p) {
  const addBtn = document.getElementById('add-cart');
  addBtn.addEventListener('click', () => {
    const qty = parseInt(document.getElementById('qty-input').value, 10) || 1;
    addToCart(p.id, qty);
    updateCartBadge();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
    });
    addBtn.textContent = 'Added to Cart';
    addBtn.classList.add('added');
    setTimeout(() => { addBtn.textContent = 'Add to Cart'; addBtn.classList.remove('added'); }, 1300);
  });

  const wishBtn = document.getElementById('wish-btn');
  wishBtn.addEventListener('click', () => {
    const now = toggleWishlist(p.id);
    wishBtn.classList.toggle('wished', now);
    wishBtn.setAttribute('aria-pressed', String(now));
    const lbl = wishBtn.querySelector('.wish-label');
    if (lbl) lbl.textContent = now ? 'Saved' : 'Save';
    updateWishBadge();
    showToast(now ? 'Saved to wishlist' : 'Removed from wishlist');
  });
}

/* ---- Tabs ---- */
function wireTabs() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach(b => {
        b.classList.remove('active'); b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });
}

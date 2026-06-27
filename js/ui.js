/* ============================================================
   ui.js — Shared UI utilities loaded on every page.
   Dark mode · badges · navbar · search · product cards · toast
   ============================================================ */

import { getCartCount, addToCart } from './cart.js';
import { getWishlistCount, toggleWishlist, isWishlisted } from './wishlist.js';
import products from './data.js';
import { ICON } from './icons.js';

const THEME_KEY = 'techmobile_theme';

/* ---------------- Dark mode ---------------- */
export function initDarkMode() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  syncThemeToggles();
}

export function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem(THEME_KEY, 'dark');
  }
  syncThemeToggles();
}

function syncThemeToggles() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.setAttribute('aria-pressed', String(isDark));
    const icon = btn.querySelector('.theme-icon');
    if (icon) icon.innerHTML = isDark ? ICON.sun : ICON.moon;
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

/* ---------------- Badges ---------------- */
export function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  });
}

export function updateWishBadge() {
  const count = getWishlistCount();
  document.querySelectorAll('.wish-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  });
}

function pulseCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.classList.remove('pulse');
    // force reflow so the animation can re-trigger
    void badge.offsetWidth;
    badge.classList.add('pulse');
  });
}

/* ---------------- Navbar (hamburger + active link) ---------------- */
export function initNavbar() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // close menu when a link is clicked (mobile)
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Active link highlight based on current file name
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here) a.classList.add('active');
  });

  // Dark mode toggle buttons
  document.querySelectorAll('.theme-toggle').forEach(btn =>
    btn.addEventListener('click', toggleDarkMode)
  );
}

/* ---------------- Search ---------------- */
/* On products.html a callback handles live filtering.
   Elsewhere, Enter redirects to products.html?search=... */
export function initSearch(onLiveSearch) {
  const input = document.querySelector('.search-input');
  if (!input) return;

  if (typeof onLiveSearch === 'function') {
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => onLiveSearch(input.value.trim()), 300);
    });
  }

  // Enter always works as a submit (useful on every page)
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (!onLiveSearch) {
        location.href = `products.html?search=${encodeURIComponent(q)}`;
      }
    }
  });
}

/* ---------------- Toast ---------------- */
let toastTimer;
export function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------------- Formatting helpers ---------------- */
export function formatPrice(n) {
  return '฿' + Math.round(Number(n)).toLocaleString('en-US');
}

export function starString(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

/* ---------------- Reusable product card ---------------- */
export function productCardHTML(p) {
  const wished = isWishlisted(p.id);
  const discount = p.originalPrice
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : 0;
  const badge = p.badge
    ? `<span class="card-badge pill pill-${badgeClass(p.badge)}">${p.badge}</span>`
    : '';
  const brand = p.brand ? `<span class="card-brand">${p.brand}</span>` : '';

  return `
    <article class="product-card" data-id="${p.id}">
      <div class="card-media">
        ${badge}
        <button class="wish-btn ${wished ? 'wished' : ''}" data-wish="${p.id}"
                aria-label="${wished ? 'Remove from' : 'Add to'} wishlist"
                aria-pressed="${wished}">${ICON.heart}</button>
        <a class="card-link" href="product-detail.html?id=${p.id}" aria-label="View ${p.name}">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        </a>
      </div>
      <div class="card-body">
        ${brand}
        <h3 class="card-title">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h3>
        <div class="card-rating">
          <span class="stars" aria-hidden="true">${starString(p.rating)}</span>
          <span class="text-muted">${p.rating} (${p.reviewCount})</span>
        </div>
        <div class="card-price">
          <span class="price">${formatPrice(p.price)}</span>
          ${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="discount">Save ${discount}%</span>` : ''}
        </div>
        <button class="btn btn-primary btn-block add-cart-btn" data-add="${p.id}">
          Add to Cart
        </button>
      </div>
    </article>`;
}

function badgeClass(badge) {
  switch (badge) {
    case 'New': return 'accent';
    case 'Sale': return 'primary';
    default: return 'muted'; // Best Seller & others
  }
}

/* Delegated handlers for any container holding product cards.
   Handles Add-to-Cart animation + wishlist toggling. */
export function initProductCardActions(container = document) {
  container.addEventListener('click', e => {
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      const id = Number(addBtn.dataset.add);
      addToCart(id, 1);
      updateCartBadge();
      pulseCartBadge();
      const original = addBtn.textContent;
      addBtn.textContent = 'Added to Cart';
      addBtn.classList.add('added');
      setTimeout(() => {
        addBtn.textContent = original;
        addBtn.classList.remove('added');
      }, 1300);
      return;
    }

    const wishBtn = e.target.closest('[data-wish]');
    if (wishBtn) {
      const id = Number(wishBtn.dataset.wish);
      const nowWished = toggleWishlist(id);
      wishBtn.classList.toggle('wished', nowWished);
      wishBtn.setAttribute('aria-pressed', String(nowWished));
      wishBtn.setAttribute('aria-label', `${nowWished ? 'Remove from' : 'Add to'} wishlist`);
      updateWishBadge();
      showToast(nowWished ? 'Saved to wishlist' : 'Removed from wishlist');
    }
  });
}

/* ---------------- Bootstrap shared UI ---------------- */
export function initUI({ onLiveSearch } = {}) {
  initDarkMode();
  initNavbar();
  initSearch(onLiveSearch);
  updateCartBadge();
  updateWishBadge();

  // Keep badges fresh if cart/wishlist change in another tab or via events.
  window.addEventListener('cart:change', updateCartBadge);
  window.addEventListener('wishlist:change', updateWishBadge);
  window.addEventListener('storage', () => {
    updateCartBadge();
    updateWishBadge();
  });
}

export { products };

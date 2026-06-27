/* ============================================================
   cart-page.js — Render & manage the shopping cart page
   ============================================================ */

import {
  getCartDetailed, getCartCount, getCartTotal, updateQty, removeFromCart
} from './cart.js';
import { initUI, formatPrice, updateCartBadge } from './ui.js';
import { ICON } from './icons.js';

const TAX_RATE = 0.07;          // Thailand VAT
const FREE_SHIP_THRESHOLD = 1500;
const SHIPPING_FEE = 120;

initUI();

const root = document.getElementById('cart-root');
const countLabel = document.getElementById('cart-count-label');

function render() {
  const items = getCartDetailed();
  const count = getCartCount();
  countLabel.textContent = `(${count} item${count === 1 ? '' : 's'})`;

  if (items.length === 0) {
    root.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${ICON.bag}</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a class="btn btn-primary" href="products.html">Start Shopping</a>
      </div>`;
    return;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const rows = items.map(item => `
    <div class="cart-row" data-id="${item.id}">
      <img class="thumb" src="${item.images[0]}" alt="${item.name}">
      <div class="info">
        <span class="cat">${item.brand ? item.brand + ' · ' : ''}${item.category}</span>
        <a class="name" href="product-detail.html?id=${item.id}">${item.name}</a>
      </div>
      <span class="unit-price">${formatPrice(item.price)}</span>
      <div class="cart-qty">
        <button data-dec="${item.id}" aria-label="Decrease quantity">−</button>
        <span>${item.qty}</span>
        <button data-inc="${item.id}" aria-label="Increase quantity">+</button>
      </div>
      <span class="line-total">${formatPrice(item.lineTotal)}</span>
      <button class="cart-remove" data-remove="${item.id}" aria-label="Remove ${item.name}">${ICON.trash}</button>
    </div>`).join('');

  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${rows}</div>

      <aside class="order-summary" aria-label="Order summary">
        <h2>Order Summary</h2>
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row ${shipping === 0 ? 'free' : ''}">
          <span>Shipping</span><span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        <div class="summary-row"><span>VAT (7%)</span><span>${formatPrice(tax)}</span></div>
        <div class="summary-total"><span>Total</span><span>${formatPrice(total)}</span></div>
        <a class="btn btn-primary btn-block" href="checkout.html">Proceed to Checkout</a>
        <a class="continue-link" href="products.html">← Continue Shopping</a>
      </aside>
    </div>`;
}

/* Delegated controls — qty +/-, remove */
root.addEventListener('click', e => {
  const inc = e.target.closest('[data-inc]');
  const dec = e.target.closest('[data-dec]');
  const rem = e.target.closest('[data-remove]');

  if (inc) {
    const id = Number(inc.dataset.inc);
    const item = getCartDetailed().find(i => i.id === id);
    if (item) updateQty(id, item.qty + 1);
  } else if (dec) {
    const id = Number(dec.dataset.dec);
    const item = getCartDetailed().find(i => i.id === id);
    if (item) updateQty(id, item.qty - 1);
  } else if (rem) {
    removeFromCart(Number(rem.dataset.remove));
  } else {
    return;
  }
  updateCartBadge();
  render();
});

render();

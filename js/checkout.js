/* ============================================================
   checkout.js — Summary render, input formatting, validation,
   order placement + confetti success
   ============================================================ */

import { getCartDetailed, getCartTotal, getCartCount, clearCart } from './cart.js';
import { initUI, formatPrice, updateCartBadge } from './ui.js';

const TAX_RATE = 0.07;          // Thailand VAT
const FREE_SHIP_THRESHOLD = 1500;
const SHIPPING_FEE = 120;

initUI();

const form = document.getElementById('checkout-form');
const summaryItems = document.getElementById('summary-items');
const summaryTotal = document.getElementById('summary-total');

/* ---- Order summary ---- */
function renderSummary() {
  const items = getCartDetailed();
  if (items.length === 0) {
    summaryItems.innerHTML = `<p class="text-muted">Your cart is empty. <a class="auth-link" href="products.html">Shop now →</a></p>`;
    summaryTotal.textContent = formatPrice(0);
    return;
  }
  summaryItems.innerHTML = items.map(i => `
    <div class="mini-item">
      <span><span class="q">${i.qty}×</span> ${i.name}</span>
      <span class="p">${formatPrice(i.lineTotal)}</span>
    </div>`).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  summaryTotal.textContent = formatPrice(subtotal + shipping + tax);
}
renderSummary();

/* ---- Input formatting ---- */
const card = document.getElementById('card');
card.addEventListener('input', () => {
  let digits = card.value.replace(/\D/g, '').slice(0, 16);
  card.value = digits.replace(/(.{4})/g, '$1 ').trim();
});

const expiry = document.getElementById('expiry');
expiry.addEventListener('input', () => {
  let d = expiry.value.replace(/\D/g, '').slice(0, 4);
  expiry.value = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
});

document.getElementById('cvv').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

/* ---- Validation helpers ---- */
function setError(field, message) {
  field.classList.toggle('invalid', !!message);
  const msg = field.parentElement.querySelector('.error-msg');
  if (msg) msg.textContent = message || '';
  return !message;
}

function validate() {
  let ok = true;
  const check = (id, test, message) => {
    const f = document.getElementById(id);
    const valid = test(f.value.trim());
    if (!setError(f, valid ? '' : message)) ok = false;
  };

  check('fullname', v => v.length >= 2, 'Please enter your full name.');
  check('email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email address.');
  check('phone', v => v.replace(/\D/g, '').length >= 7, 'Enter a valid phone number.');
  check('street', v => v.length >= 4, 'Please enter your street address.');
  check('city', v => v.length >= 2, 'Required.');
  check('state', v => v.length >= 2, 'Required.');
  check('zip', v => v.length >= 3, 'Required.');
  check('country', v => v !== '', 'Please select a country.');
  check('card', v => v.replace(/\s/g, '').length === 16, 'Card number must be 16 digits.');
  check('cardname', v => v.length >= 2, 'Required.');
  check('expiry', v => /^\d{2}\/\d{2}$/.test(v), 'Use MM/YY format.');
  check('cvv', v => /^\d{3,4}$/.test(v), '3–4 digits.');

  return ok;
}

/* ---- Submit ---- */
form.addEventListener('submit', e => {
  e.preventDefault();

  if (getCartCount() === 0) {
    alert('Your cart is empty — add something before checking out.');
    return;
  }
  if (!validate()) {
    // focus first invalid field
    const firstInvalid = form.querySelector('.invalid');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  clearCart();
  updateCartBadge();
  showSuccess();
});

/* ---- Success + confetti ---- */
function showSuccess() {
  const overlay = document.getElementById('success-overlay');
  overlay.classList.add('show');
  launchConfetti(overlay);
}

function launchConfetti(container) {
  const colors = ['#FF5722', '#00BCD4', '#22C55E', '#F59E0B', '#E64A19'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    // deterministic-ish spread without Math.random dependency issues
    const left = (i / 80) * 100;
    const delay = (i % 10) * 0.15;
    const duration = 2.2 + (i % 5) * 0.4;
    piece.style.left = `${left}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${delay}s`;
    piece.style.animationDuration = `${duration}s`;
    piece.style.transform = `rotate(${i * 24}deg)`;
    container.appendChild(piece);
  }
}

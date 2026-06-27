/* ============================================================
   products.js — Controller for the product listing page
   Wires filters, sort, view toggle, search & URL params together
   ============================================================ */

import products, { categories } from './data.js';
import { filterProducts, sortProducts } from './filter.js';
import { getQueryParams } from './search.js';
import {
  initUI, productCardHTML, initProductCardActions
} from './ui.js';

/* ---- Current filter state ---- */
const state = {
  categories: new Set(),
  brands: new Set(),
  minPrice: 0,
  maxPrice: Infinity,
  minRating: 0,
  search: '',
  onSale: false,
  sortBy: 'default',
  view: 'grid'
};

const PRICE_MAX = 100000;

/* ---- DOM refs ---- */
const grid        = document.getElementById('product-grid');
const emptyState  = document.getElementById('empty-state');
const resultCount = document.getElementById('result-count');
const sortSelect  = document.getElementById('sort-select');
const minPriceEl  = document.getElementById('min-price');
const maxPriceEl  = document.getElementById('max-price');
const rangeEl     = document.getElementById('price-range');
const rangeLabel  = document.getElementById('range-max-label');
const filtersEl   = document.getElementById('filters');

/* ---- Build category checkboxes ---- */
document.getElementById('category-filters').innerHTML = categories.map(c => `
  <label class="filter-option">
    <input type="checkbox" value="${c.key}" data-cat>
    ${c.icon} ${c.label}
  </label>`).join('');

/* ---- Render ---- */
function render() {
  let list = filterProducts(products, {
    categories: [...state.categories],
    brands: [...state.brands],
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
    minRating: state.minRating,
    search: state.search,
    onSale: state.onSale
  });
  list = sortProducts(list, state.sortBy);

  resultCount.textContent = `Showing ${list.length} product${list.length === 1 ? '' : 's'}`;

  if (list.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    grid.innerHTML = list.map(productCardHTML).join('');
  }
  grid.classList.toggle('list-view', state.view === 'list');
}

/* ---- Apply incoming URL params (?category= ?search= ?filter=) ---- */
function applyUrlParams() {
  const q = getQueryParams();

  if (q.category) {
    state.categories.add(q.category);
    const box = document.querySelector(`[data-cat][value="${q.category}"]`);
    if (box) box.checked = true;
  }
  if (q.search) {
    state.search = q.search;
    const input = document.querySelector('.search-input');
    if (input) input.value = q.search;
  }
  if (q.filter === 'sale') {
    // Show only discounted items, cheapest first
    state.onSale = true;
    state.sortBy = 'price-asc';
    sortSelect.value = 'price-asc';
  }
}

/* ---- Event wiring ---- */
function wireEvents() {
  // Category checkboxes
  document.querySelectorAll('[data-cat]').forEach(box =>
    box.addEventListener('change', () => {
      box.checked ? state.categories.add(box.value) : state.categories.delete(box.value);
      render();
    })
  );

  // Brand checkboxes
  document.querySelectorAll('[data-brand]').forEach(box =>
    box.addEventListener('change', () => {
      box.checked ? state.brands.add(box.value) : state.brands.delete(box.value);
      render();
    })
  );

  // Price range slider
  rangeEl.addEventListener('input', () => {
    const v = Number(rangeEl.value);
    rangeLabel.textContent = '฿' + v.toLocaleString('en-US');
    state.maxPrice = v >= PRICE_MAX ? Infinity : v;
    maxPriceEl.value = v >= PRICE_MAX ? '' : v;
    render();
  });

  // Manual price inputs
  minPriceEl.addEventListener('input', () => {
    state.minPrice = minPriceEl.value === '' ? 0 : Number(minPriceEl.value);
    render();
  });
  maxPriceEl.addEventListener('input', () => {
    state.maxPrice = maxPriceEl.value === '' ? Infinity : Number(maxPriceEl.value);
    render();
  });

  // Rating radios
  document.querySelectorAll('input[name="rating"]').forEach(radio =>
    radio.addEventListener('change', () => {
      state.minRating = Number(radio.value);
      render();
    })
  );

  // Sort
  sortSelect.addEventListener('change', () => {
    state.sortBy = sortSelect.value;
    render();
  });

  // View toggle
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');
  gridBtn.addEventListener('click', () => setView('grid', gridBtn, listBtn));
  listBtn.addEventListener('click', () => setView('list', listBtn, gridBtn));

  // Clear filters (both buttons)
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
  document.getElementById('clear-filters-empty').addEventListener('click', clearFilters);

  // Mobile filter drawer
  const openBtn = document.getElementById('open-filters');
  if (openBtn) {
    openBtn.addEventListener('click', () => filtersEl.classList.toggle('open'));
  }
}

function setView(view, onBtn, offBtn) {
  state.view = view;
  onBtn.classList.add('active');  onBtn.setAttribute('aria-pressed', 'true');
  offBtn.classList.remove('active'); offBtn.setAttribute('aria-pressed', 'false');
  render();
}

function clearFilters() {
  state.categories.clear();
  state.brands.clear();
  state.minPrice = 0;
  state.maxPrice = Infinity;
  state.minRating = 0;
  state.search = '';
  state.onSale = false;
  state.sortBy = 'default';

  document.querySelectorAll('[data-cat]').forEach(b => (b.checked = false));
  document.querySelectorAll('[data-brand]').forEach(b => (b.checked = false));
  document.querySelector('input[name="rating"][value="0"]').checked = true;
  minPriceEl.value = '';
  maxPriceEl.value = '';
  rangeEl.value = PRICE_MAX;
  rangeLabel.textContent = '฿' + PRICE_MAX.toLocaleString('en-US');
  sortSelect.value = 'default';
  const input = document.querySelector('.search-input');
  if (input) input.value = '';
  render();
}

/* ---- Boot ---- */
initUI({
  onLiveSearch(query) {
    state.search = query;
    render();
  }
});
initProductCardActions();
applyUrlParams();
wireEvents();
render();

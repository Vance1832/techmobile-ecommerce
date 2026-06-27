/* ============================================================
   search.js — URL query helpers + product text matching
   ============================================================ */

/* Read the current page's query string as a plain object. */
export function getQueryParams() {
  const params = new URLSearchParams(location.search);
  const out = {};
  for (const [k, v] of params.entries()) out[k] = v;
  return out;
}

/* Case-insensitive match across name, description, category. */
export function matchesQuery(product, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  return `${product.name} ${product.description} ${product.category}`
    .toLowerCase()
    .includes(q);
}

/* Filter a list by a free-text query. */
export function searchProducts(list, query) {
  return list.filter(p => matchesQuery(p, query));
}

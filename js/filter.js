/* ============================================================
   filter.js — Pure filtering & sorting helpers for the shop
   ============================================================ */

/* Filter by category set, price range, and minimum rating.
   opts = { categories: Set|Array, minPrice, maxPrice, minRating, search } */
export function filterProducts(list, opts = {}) {
  const {
    categories = [],
    brands = [],
    minPrice = 0,
    maxPrice = Infinity,
    minRating = 0,
    search = '',
    onSale = false
  } = opts;

  const cats = Array.isArray(categories) ? categories : [...categories];
  const brandList = Array.isArray(brands) ? brands : [...brands];
  const q = search.trim().toLowerCase();

  return list.filter(p => {
    if (cats.length && !cats.includes(p.category)) return false;
    if (brandList.length && !brandList.includes(p.brand)) return false;
    if (onSale && !p.originalPrice) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    if (q) {
      const haystack = `${p.name} ${p.description} ${p.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/* Sort: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'default' */
export function sortProducts(list, sortBy) {
  const arr = [...list];
  switch (sortBy) {
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr.sort((a, b) => b.price - a.price);
    case 'rating':     return arr.sort((a, b) => b.rating - a.rating);
    case 'newest':     return arr.sort((a, b) => b.id - a.id);
    default:           return arr; // catalogue order
  }
}

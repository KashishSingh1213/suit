/**
 * adminStore.js — Shared localStorage bridge between Admin Panel and Main Website
 * Admin saves data here → Main website reads from here
 */

const KEYS = {
  products:     'gurnaaz_products',
  gallery:      'gurnaaz_gallery',
  hero:         'gurnaaz_hero',
  promotions:   'gurnaaz_promotions',
  testimonials: 'gurnaaz_testimonials',
  categories:   'gurnaaz_categories',
  lookbook:     'gurnaaz_lookbook',
};

// ── Generic helpers ──────────────────────────────────────────
const get  = (key, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const set  = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ── Convert image File → base64 (persists in localStorage) ──
export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// ── PRODUCTS ─────────────────────────────────────────────────
export const getProducts   = ()           => get(KEYS.products, []);
export const saveProducts  = (arr)        => set(KEYS.products, arr);
export const addProduct    = (product)    => { const arr = getProducts(); arr.unshift(product); saveProducts(arr); };
export const updateProduct = (id, data)   => saveProducts(getProducts().map(p => p.id === id ? { ...p, ...data } : p));
export const deleteProduct = (id)         => saveProducts(getProducts().filter(p => p.id !== id));

// ── GALLERY ──────────────────────────────────────────────────
export const getGallery    = ()           => get(KEYS.gallery, []);
export const saveGallery   = (arr)        => set(KEYS.gallery, arr);
export const addGalleryItem= (item)       => { const arr = getGallery(); arr.unshift(item); saveGallery(arr); };
export const deleteGallery = (id)         => saveGallery(getGallery().filter(g => g.id !== id));

// ── HERO ─────────────────────────────────────────────────────
export const getHero  = (fallback) => get(KEYS.hero, fallback);
export const saveHero = (data)     => set(KEYS.hero, data);

// ── PROMOTIONS ───────────────────────────────────────────────
export const getPromo  = (fallback) => get(KEYS.promotions, fallback);
export const savePromo = (data)     => set(KEYS.promotions, data);

// ── TESTIMONIALS ─────────────────────────────────────────────
export const getTestimonials  = ()    => get(KEYS.testimonials, []);
export const saveTestimonials = (arr) => set(KEYS.testimonials, arr);

// ── CATEGORIES ───────────────────────────────────────────────
export const getCategories  = ()    => get(KEYS.categories, []);
export const saveCategories = (arr) => set(KEYS.categories, arr);

// ── LOOKBOOK ─────────────────────────────────────────────────
export const getLookbook  = (fallback) => get(KEYS.lookbook, fallback);
export const saveLookbook = (data)     => set(KEYS.lookbook, data);

// ── Notify main website of data change ───────────────────────
export const notifyWebsite = () => {
  window.dispatchEvent(new CustomEvent('admin-data-updated'));
};

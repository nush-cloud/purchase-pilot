import { ProductRecommendation } from "./types";

const SESSION_RECOMMENDATIONS_KEY = "purchase-pilot-session-recommendations";
const SAVED_PRODUCTS_KEY = "purchase-pilot-saved-products";
const SAVED_PRODUCTS_UPDATED_EVENT = "purchase-pilot-saved-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function notifySavedProductsUpdated() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(SAVED_PRODUCTS_UPDATED_EVENT));
}

export function getSavedProductsUpdatedEventName() {
  return SAVED_PRODUCTS_UPDATED_EVENT;
}

export function getSessionRecommendations(): ProductRecommendation[] {
  if (!isBrowser()) return [];

  const raw = localStorage.getItem(SESSION_RECOMMENDATIONS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ProductRecommendation[];
  } catch {
    return [];
  }
}

export function setSessionRecommendations(
  recommendations: ProductRecommendation[]
) {
  if (!isBrowser()) return;

  localStorage.setItem(
    SESSION_RECOMMENDATIONS_KEY,
    JSON.stringify(recommendations)
  );
}

export function getSavedProducts(): ProductRecommendation[] {
  if (!isBrowser()) return [];

  const raw = localStorage.getItem(SAVED_PRODUCTS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ProductRecommendation[];
  } catch {
    return [];
  }
}

export function setSavedProducts(products: ProductRecommendation[]) {
  if (!isBrowser()) return;

  localStorage.setItem(SAVED_PRODUCTS_KEY, JSON.stringify(products));
  notifySavedProductsUpdated();
}

export function isProductSaved(productName: string) {
  const saved = getSavedProducts();
  return saved.some((product) => product.name === productName);
}

export function saveProduct(product: ProductRecommendation) {
  const saved = getSavedProducts();

  const alreadySaved = saved.some(
    (savedProduct) => savedProduct.name === product.name
  );

  if (alreadySaved) return;

  setSavedProducts([...saved, product]);
}

export function removeSavedProduct(productName: string) {
  const saved = getSavedProducts();
  const updated = saved.filter((product) => product.name !== productName);
  setSavedProducts(updated);
}
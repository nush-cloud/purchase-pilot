import { ProductRecommendation } from "./types";

const SESSION_RECOMMENDATIONS_KEY = "purchase-pilot-session-recommendations";
const SAVED_PRODUCTS_KEY = "purchase-pilot-saved-products";
const COMPARE_PRODUCTS_KEY = "purchase-pilot-compare-products";

const SAVED_PRODUCTS_UPDATED_EVENT = "purchase-pilot-saved-updated";
const SESSION_RECOMMENDATIONS_UPDATED_EVENT =
  "purchase-pilot-session-recommendations-updated";
const COMPARE_PRODUCTS_UPDATED_EVENT = "purchase-pilot-compare-products-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function notifySavedProductsUpdated() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(SAVED_PRODUCTS_UPDATED_EVENT));
}

function notifySessionRecommendationsUpdated() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(SESSION_RECOMMENDATIONS_UPDATED_EVENT));
}

function notifyCompareProductsUpdated() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(COMPARE_PRODUCTS_UPDATED_EVENT));
}

export function getSavedProductsUpdatedEventName() {
  return SAVED_PRODUCTS_UPDATED_EVENT;
}

export function getSessionRecommendationsUpdatedEventName() {
  return SESSION_RECOMMENDATIONS_UPDATED_EVENT;
}

export function getCompareProductsUpdatedEventName() {
  return COMPARE_PRODUCTS_UPDATED_EVENT;
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
  notifySessionRecommendationsUpdated();
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

export function getSavedProductsCount() {
  return getSavedProducts().length;
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

export function getCompareProducts(): ProductRecommendation[] {
  if (!isBrowser()) return [];

  const raw = localStorage.getItem(COMPARE_PRODUCTS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ProductRecommendation[];
  } catch {
    return [];
  }
}

export function getCompareProductsCount() {
  return getCompareProducts().length;
}

export function setCompareProducts(products: ProductRecommendation[]) {
  if (!isBrowser()) return;

  localStorage.setItem(COMPARE_PRODUCTS_KEY, JSON.stringify(products));
  notifyCompareProductsUpdated();
}

export function isProductCompared(productName: string) {
  const compared = getCompareProducts();
  return compared.some((product) => product.name === productName);
}

export function addCompareProduct(product: ProductRecommendation) {
  const compared = getCompareProducts();

  const alreadyCompared = compared.some(
    (compareProduct) => compareProduct.name === product.name
  );

  if (alreadyCompared) return;

  setCompareProducts([...compared, product]);
}

export function removeCompareProduct(productName: string) {
  const compared = getCompareProducts();
  const updated = compared.filter((product) => product.name !== productName);
  setCompareProducts(updated);
}

export function clearCompareProducts() {
  setCompareProducts([]);
}
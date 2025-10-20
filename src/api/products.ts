import type { UIFilters, UIProduct } from '../types/ui';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../mocks/products';

// Mock API для разработки
// TODO: заменить на реальные API calls

export async function fetchProducts(filters: UIFilters): Promise<UIProduct[]> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...MOCK_PRODUCTS];

  // Search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  // Category
  if (filters.categoryId) {
    filtered = filtered.filter((p) => p.category.id === filters.categoryId);
  }

  // In Stock
  if (filters.inStock) {
    filtered = filtered.filter((p) => p.quantity > 0);
  }

  // On Sale
  if (filters.onSale) {
    filtered = filtered.filter((p) => p.discountPrice !== null);
  }

  // Is New
  if (filters.isNew) {
    filtered = filtered.filter((p) => p.isNew);
  }

  // Ordering
  switch (filters.ordering) {
    case 'price':
      filtered.sort((a, b) => a.priceEffective - b.priceEffective);
      break;
    case '-price':
      filtered.sort((a, b) => b.priceEffective - a.priceEffective);
      break;
    case '-created_at':
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case 'created_at':
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;
  }

  return filtered;
}

export async function fetchProduct(id: number): Promise<UIProduct | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}

export async function fetchCategories() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_CATEGORIES;
}

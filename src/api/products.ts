import type { UIFilters, UIProduct } from '../types/ui';
import { mapProduct, mapCategory } from '../utils/mappers';
import { APIProduct, APICategory } from '../types/api';

const API_BASE_URL = 'http://195.158.9.83:8000';

export async function fetchProducts(filters: UIFilters): Promise<UIProduct[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.categoryId) {
      params.append('category', filters.categoryId.toString());
    }
    if (filters.ordering) {
      params.append('ordering', filters.ordering);
    }

    const response = await fetch(`${API_BASE_URL}/products/?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const apiProducts: APIProduct[] = data.results || data;
    
    // Apply client-side filters that aren't supported by API
    let filtered = apiProducts.map(product => mapProduct(product));

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

    return filtered;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function fetchProduct(id: number): Promise<UIProduct | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiProduct: APIProduct = await response.json();
    return mapProduct(apiProduct);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const apiCategories: APICategory[] = data.results || data;
    
    return apiCategories.map(category => mapCategory(category));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

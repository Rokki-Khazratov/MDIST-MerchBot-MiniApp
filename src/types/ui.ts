// UI models (normalized for frontend)

export interface UICategory {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
}

export interface UIProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface UIProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice: number | null;
  priceEffective: number;
  quantity: number;
  isActive: boolean;
  isNew: boolean;
  thumbnailUrl: string;
  images: UIProductImage[];
  category: UICategory;
  createdAt: string;
}

export interface UICartItem {
  product: UIProduct;
  qty: number;
}

export interface UIFilters {
  search: string;
  categoryId: number | null;
  inStock: boolean;
  onSale: boolean;
  isNew: boolean;
  ordering: 'price' | '-price' | 'created_at' | '-created_at';
}


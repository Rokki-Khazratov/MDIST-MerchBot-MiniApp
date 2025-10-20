// UI models (normalized for frontend)

export interface UICategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
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
  price: number;
  discountPrice?: number;
  priceEffective: number;
  categoryId: number;
  categoryName: string;
  quantity: number;
  isActive: boolean;
  thumbnailUrl?: string;
  images: string[];
  isNew: boolean;
  isOnSale: boolean;
}

export interface UICartItem {
  productId: number;
  quantity: number;
}

export interface UIFilters {
  search: string;
  categoryId: number | null;
  inStock: boolean;
  onSale: boolean;
  isNew: boolean;
  ordering: 'price' | '-price' | 'created_at' | '-created_at';
}

export interface UIPromoCode {
  id: number;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumCartTotal?: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
}


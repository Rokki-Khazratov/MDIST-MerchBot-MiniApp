// API response types (raw from backend)

export interface APICategory {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  sort_order: number;
}

export interface APIProductImage {
  id: number;
  image: {
    id: number;
    file: string;
    alt_text: string;
  };
  is_primary: boolean;
  sort_order: number;
}

export interface APIProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  discount_price: string | null;
  price_effective: string;
  quantity: number;
  category: APICategory;
  images: APIProductImage[];
  is_active: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}


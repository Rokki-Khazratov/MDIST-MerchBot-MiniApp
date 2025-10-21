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
  discount_price?: string;
  price_effective: string;
  quantity: number;
  category: APICategory;
  thumbnail?: string;
  images?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderRequest {
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
  customer_name: string;
  customer_phone: string;
  payment_method: 'card' | 'cash';
  promo_code?: string | null;
}

export interface APIOrder {
  id: number;
  customer_name: string;
  customer_phone: string;
  payment_method: 'card' | 'cash';
  promo_code?: string | null;
  total_amount: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface APIPromoCode {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_cart_total?: number;
  valid_from: string;
  valid_to: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


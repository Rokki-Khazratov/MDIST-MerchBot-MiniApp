import type { APIProduct, APICategory, APIPromoCode } from '../types/api';
import type { UIProduct, UICategory, UIPromoCode } from '../types/ui';

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

const isNewProduct = (createdAt: string): boolean => {
  const productDate = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - productDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 30; // Considered new if created within 30 days
};

export const mapCategory = (api: APICategory): UICategory => ({
  id: api.id,
  name: api.name,
  slug: api.slug,
  description: '', // API does not provide description for category
  isActive: api.is_active,
});

export const mapProduct = (api: APIProduct, categories?: UICategory[]): UIProduct => {
  // Use category from API response or find in provided categories
  const category = api.category || categories?.find(c => c.id === api.category?.id);
  
  return {
    id: api.id,
    name: api.name,
    slug: api.slug,
    description: api.description,
    price: parseFloat(api.price), // Converted from string to number
    discountPrice: api.discount_price ? parseFloat(api.discount_price) : undefined, // Converted from string to number
    priceEffective: parseFloat(api.price_effective), // Converted from string to number
    categoryId: api.category?.id || 0,
    categoryName: api.category?.name || category?.name || 'Unknown',
    quantity: api.quantity,
    isActive: api.is_active,
    thumbnailUrl: api.thumbnail,
    images: api.images || [],
    isNew: isNewProduct(api.created_at),
    isOnSale: !!api.discount_price && parseFloat(api.discount_price) < parseFloat(api.price), // Used parseFloat
  };
};

export const mapPromoCode = (api: APIPromoCode): UIPromoCode => ({
  id: api.id,
  code: api.code,
  discountType: api.discount_type,
  discountValue: api.discount_value,
  minimumCartTotal: api.minimum_cart_total,
  validFrom: new Date(api.valid_from),
  validTo: new Date(api.valid_to),
  isActive: api.is_active,
});


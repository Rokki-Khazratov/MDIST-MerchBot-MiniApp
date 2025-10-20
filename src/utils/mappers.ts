import type { APIProduct, APIProductImage, APICategory } from '../types/api';
import type { UIProduct, UIProductImage, UICategory } from '../types/ui';
import { parsePrice } from './currency';

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

function extractThumbnail(images: APIProductImage[]): string {
  const primary = images.find((img) => img.is_primary);
  if (primary) return primary.image.file;
  if (images.length > 0) return images[0].image.file;
  return '/placeholder.png';
}

function normalizeImages(apiImages: APIProductImage[]): UIProductImage[] {
  return apiImages
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({
      url: img.image.file,
      alt: img.image.alt_text || '',
      isPrimary: img.is_primary,
      order: img.sort_order,
    }));
}

function mapCategory(apiCategory: APICategory): UICategory {
  return {
    id: apiCategory.id,
    name: apiCategory.name,
    slug: apiCategory.slug,
    isActive: apiCategory.is_active,
    sortOrder: apiCategory.sort_order,
  };
}

export function mapAPIProductToUI(apiProduct: APIProduct): UIProduct {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    description: apiProduct.description,
    shortDescription: truncateText(apiProduct.description, 100),
    price: parsePrice(apiProduct.price),
    discountPrice: apiProduct.discount_price ? parsePrice(apiProduct.discount_price) : null,
    priceEffective: parsePrice(apiProduct.price_effective),
    quantity: apiProduct.quantity,
    isActive: apiProduct.is_active,
    isNew: apiProduct.is_new,
    thumbnailUrl: extractThumbnail(apiProduct.images),
    images: normalizeImages(apiProduct.images),
    category: mapCategory(apiProduct.category),
    createdAt: apiProduct.created_at,
  };
}


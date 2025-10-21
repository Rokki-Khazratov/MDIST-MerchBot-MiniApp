import type { UIProduct } from '../types/ui';

// Mock products для разработки
export const MOCK_PRODUCTS: UIProduct[] = [
  {
    id: 1,
    name: 'MDIST University Футболка',
    slug: 'mdist-tshirt',
    description: 'Классическая университетская футболка из 100% хлопка. Мягкая, удобная и стильная.',
    price: 150000,
    discountPrice: undefined,
    priceEffective: 150000,
    quantity: 50,
    isActive: true,
    isNew: true,
    isOnSale: false,
    thumbnailUrl: 'https://via.placeholder.com/400x400/1A1A1A/FFFFFF?text=MDIST+Tshirt',
    images: [
      'https://via.placeholder.com/800x800/1A1A1A/FFFFFF?text=MDIST+Tshirt',
    ],
    categoryId: 1,
    categoryName: 'Футболки',
  },
  {
    id: 2,
    name: 'MDIST Худи',
    slug: 'mdist-hoodie',
    description: 'Теплое университетское худи с капюшоном. Идеально для прохладной погоды.',
    price: 350000,
    discountPrice: 280000,
    priceEffective: 280000,
    quantity: 30,
    isActive: true,
    isNew: false,
    isOnSale: true,
    thumbnailUrl: 'https://via.placeholder.com/400x400/2A2A2A/FFFFFF?text=MDIST+Hoodie',
    images: [
      'https://via.placeholder.com/800x800/2A2A2A/FFFFFF?text=MDIST+Hoodie',
    ],
    categoryId: 2,
    categoryName: 'Худи',
  },
  {
    id: 3,
    name: 'MDIST Кепка',
    slug: 'mdist-cap',
    description: 'Стильная университетская кепка с вышитым логотипом.',
    price: 80000,
    discountPrice: undefined,
    priceEffective: 80000,
    quantity: 100,
    isActive: true,
    isNew: true,
    isOnSale: false,
    thumbnailUrl: 'https://via.placeholder.com/400x400/0A0A0A/FFFFFF?text=MDIST+Cap',
    images: [
      'https://via.placeholder.com/800x800/0A0A0A/FFFFFF?text=MDIST+Cap',
    ],
    categoryId: 3,
    categoryName: 'Аксессуары',
  },
  {
    id: 4,
    name: 'MDIST Рюкзак',
    slug: 'mdist-backpack',
    description: 'Вместительный университетский рюкзак для книг и ноутбука.',
    price: 250000,
    discountPrice: 200000,
    priceEffective: 200000,
    quantity: 20,
    isActive: true,
    isNew: false,
    isOnSale: true,
    thumbnailUrl: 'https://via.placeholder.com/400x400/1A1A1A/FFFFFF?text=MDIST+Backpack',
    images: [
      'https://via.placeholder.com/800x800/1A1A1A/FFFFFF?text=MDIST+Backpack',
    ],
    categoryId: 3,
    categoryName: 'Аксессуары',
  },
];

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Футболки', slug: 'tshirts', isActive: true },
  { id: 2, name: 'Худи', slug: 'hoodies', isActive: true },
  { id: 3, name: 'Аксессуары', slug: 'accessories', isActive: true },
];


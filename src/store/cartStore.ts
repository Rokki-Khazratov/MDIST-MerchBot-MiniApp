import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UIProduct, UICartItem } from '../types/ui';

interface CartState {
  items: UICartItem[];
  addItem: (product: UIProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { productId: product.id, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.productId === productId);
        return item ? item.quantity : 0;
      },

      getTotalPrice: () => {
        // This will need to be calculated with actual product data
        // For now, return 0 - will be updated when we have product data
        return 0;
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      toggleCart: () => {
        // This will be handled by UI store
      },
    }),
    {
      name: 'mdist-cart',
    }
  )
);


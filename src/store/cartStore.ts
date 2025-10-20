import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UIProduct, UICartItem } from '../types/ui';

interface CartState {
  items: UICartItem[];
  add: (product: UIProduct, qty?: number) => void;
  remove: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clear: () => void;
  itemsCount: () => number;
  subtotal: () => number;
  total: () => number;
  hasItems: () => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product, qty = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, qty: item.qty + qty }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, qty }],
          };
        });
      },

      remove: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().remove(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, qty } : item
          ),
        }));
      },

      clear: () => {
        set({ items: [] });
      },

      itemsCount: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0);
      },

      subtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.priceEffective * item.qty,
          0
        );
      },

      total: () => {
        return get().subtotal();
      },

      hasItems: () => {
        return get().items.length > 0;
      },
    }),
    {
      name: 'mdist-cart',
    }
  )
);


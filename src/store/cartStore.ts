import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UIProduct, UICartItem } from '../types/ui';

interface CartState {
  items: UICartItem[];
  // New API
  addItem: (product: UIProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  toggleCart: () => void;
  // Legacy aliases kept for backward compatibility with existing components
  add?: (product: UIProduct, qty?: number) => void;
  remove?: (productId: number) => void;
  updateQty?: (productId: number, qty: number) => void;
  subtotal?: () => number;
  itemsCount?: () => number;
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
        // Fallback: if legacy product is stored inside cart item, use it
        return get().items.reduce((sum, item) => {
          if (item.product) {
            const price = item.product.priceEffective ?? item.product.price;
            return sum + price * (item.qty ?? item.quantity);
          }
          // When only productId is stored, total will be computed elsewhere
          return sum;
        }, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      toggleCart: () => {
        // This will be handled by UI store
      },

      // Legacy aliases
      add: (product, qty = 1) => get().addItem(product, qty),
      remove: (productId) => get().removeItem(productId),
      updateQty: (productId, qty) => get().updateQuantity(productId, qty),
      subtotal: () => get().getTotalPrice(),
      itemsCount: () => get().getTotalItems(),
    }),
    {
      name: 'mdist-cart',
    }
  )
);


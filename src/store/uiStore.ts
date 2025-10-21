import { create } from 'zustand';
import type { UIFilters } from '../types/ui';

interface UIState {
  filters: UIFilters;
  cartDrawerOpen: boolean;
  setFilter: <K extends keyof UIFilters>(key: K, value: UIFilters[K]) => void;
  resetFilters: () => void;
  toggleCartDrawer: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const defaultFilters: UIFilters = {
  search: '',
  categoryId: null,
  inStock: false,
  onSale: false,
  isNew: false,
  ordering: '-created_at',
};

export const useUIStore = create<UIState>()((set) => ({
  filters: defaultFilters,
  cartDrawerOpen: false,

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  toggleCartDrawer: () => {
    set((state) => ({ cartDrawerOpen: !state.cartDrawerOpen }));
  },

  openCartDrawer: () => {
    set({ cartDrawerOpen: true });
  },

  closeCartDrawer: () => {
    set({ cartDrawerOpen: false });
  },
}));


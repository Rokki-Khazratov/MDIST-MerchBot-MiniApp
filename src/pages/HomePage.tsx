import { useEffect, useState } from 'react';
import { useUIStore } from '../store/uiStore';
import { fetchProducts, fetchCategories } from '../api/products';
import type { UIProduct, UICategory } from '../types/ui';
import { Header } from '../components/organisms/Header';
import { CartDrawer } from '../components/organisms/CartDrawer';
import { CategoryChips } from '../components/molecules/CategoryChips';
import { FilterBar } from '../components/molecules/FilterBar';
import { CatalogGrid } from '../components/organisms/CatalogGrid';

export function HomePage() {
  // Force Vercel deploy update - ensure latest version is deployed
  const { filters, setFilter, resetFilters } = useUIStore();
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [categories, setCategories] = useState<UICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts(filters)
      .then(setProducts)
      .catch((error) => {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <h2 style={styles.title}>Главная</h2>

        {/* Categories */}
        <CategoryChips
          categories={categories}
          selectedId={filters.categoryId}
          onSelect={(id) => setFilter('categoryId', id)}
        />

        {/* Filters */}
        <FilterBar />

        {/* Products Grid */}
        <CatalogGrid
          products={products}
          loading={loading}
          onResetFilters={resetFilters}
        />
      </main>

      <CartDrawer />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0A0A0A',
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: 'white',
    margin: 0,
  },
};

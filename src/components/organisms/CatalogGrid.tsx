import type { UIProduct } from '../../types/ui';
import { ProductCard } from '../molecules/ProductCard';
import { Button } from '../atoms/Button';

interface CatalogGridProps {
  products: UIProduct[];
  loading?: boolean;
  onResetFilters?: () => void;
}

export function CatalogGrid({
  products,
  loading = false,
  onResetFilters,
}: CatalogGridProps) {
  if (loading) {
    return (
      <div style={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={styles.skeleton}>
            <div style={styles.skeletonImage} />
            <div style={styles.skeletonText} />
            <div style={{ ...styles.skeletonText, width: '60%' }} />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>🔍</div>
        <h3 style={styles.emptyTitle}>
          Ничего не найдено
        </h3>
        <p style={styles.emptyText}>
          Попробуйте изменить фильтры или поисковый запрос
        </p>
        {onResetFilters && (
          <Button onClick={onResetFilters} variant="secondary">
            Сбросить фильтры
          </Button>
        )}
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
  skeleton: {
    padding: 16,
  },
  skeletonImage: {
    aspectRatio: '1',
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    marginBottom: 12,
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  skeletonText: {
    height: 16,
    borderRadius: 4,
    backgroundColor: '#1A1A1A',
    marginBottom: 8,
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '64px 16px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: 'white',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },
};

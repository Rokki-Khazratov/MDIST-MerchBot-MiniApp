import { Chip } from '../atoms/Chip';
import { useUIStore } from '../../store/uiStore';

export function FilterBar() {
  const { filters, setFilter } = useUIStore();

  const toggleFilter = (key: 'inStock' | 'onSale' | 'isNew') => {
    setFilter(key, !filters[key]);
  };

  return (
    <div style={styles.container}>
      <Chip
        label="В наличии"
        selected={filters.inStock}
        onClick={() => toggleFilter('inStock')}
      />
      <Chip
        label="Со скидкой"
        selected={filters.onSale}
        onClick={() => toggleFilter('onSale')}
      />
      <Chip
        label="Новинки"
        selected={filters.isNew}
        onClick={() => toggleFilter('isNew')}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    paddingBottom: 8,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
};

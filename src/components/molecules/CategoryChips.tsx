import { Chip } from '../atoms/Chip';
import type { UICategory } from '../../types/ui';

interface CategoryChipsProps {
  categories: UICategory[];
  selectedId: number | null;
  onSelect: (categoryId: number | null) => void;
}

export function CategoryChips({
  categories,
  selectedId,
  onSelect,
}: CategoryChipsProps) {
  return (
    <div style={styles.container}>
      <Chip
        label="Все"
        selected={selectedId === null}
        onClick={() => onSelect(null)}
      />
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          selected={selectedId === category.id}
          onClick={() => onSelect(category.id)}
        />
      ))}
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

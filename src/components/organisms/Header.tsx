import { Link } from 'react-router-dom';
import { SearchBar } from '../molecules/SearchBar';
import { IconButton } from '../atoms/IconButton';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';

export function Header() {
  const itemsCount = useCartStore((state) => state.itemsCount());
  const { filters, setFilter, openCartDrawer } = useUIStore();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            MDIST Wear
          </Link>

          {/* Search Bar */}
          <div style={styles.searchWrapper}>
            <SearchBar
              value={filters.search}
              onChange={(value: string) => setFilter('search', value)}
              placeholder="Я ищу..."
            />
          </div>

          {/* Cart Button */}
          <IconButton
            icon={
              <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            badge={itemsCount}
            onClick={openCartDrawer}
            aria-label="Open cart"
          />
        </div>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    borderBottom: '1px solid #2A2A2A',
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(8px)',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '16px 0',
  },
  logo: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s',
  },
  searchWrapper: {
    flex: 1,
  },
};

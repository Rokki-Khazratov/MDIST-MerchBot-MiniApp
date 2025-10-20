import { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { Button } from '../atoms/Button';
import { CartLineItem } from '../molecules/CartLineItem';
import { Price } from '../atoms/Price';

export function CartDrawer() {
  const cartDrawerOpen = useUIStore((state) => state.cartDrawerOpen);
  const closeCartDrawer = useUIStore((state) => state.closeCartDrawer);

  const { items, updateQty, remove, subtotal, hasItems } = useCartStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && cartDrawerOpen) {
        closeCartDrawer();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [cartDrawerOpen, closeCartDrawer]);

  useEffect(() => {
    if (cartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cartDrawerOpen]);

  const handleCheckout = () => {
    closeCartDrawer();
    alert('Оформление заказа скоро будет доступно!');
  };

  if (!cartDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={styles.backdrop}
        onClick={closeCartDrawer}
      />

      {/* Drawer */}
      <div style={styles.drawer}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            Корзина ({items.length})
          </h2>
          <button
            onClick={closeCartDrawer}
            style={styles.closeButton}
          >
            <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {!hasItems() ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🛒</div>
            <h3 style={styles.emptyTitle}>
              Корзина пуста
            </h3>
            <p style={styles.emptyText}>
              Добавьте товары, чтобы начать заказ
            </p>
            <Button onClick={closeCartDrawer} variant="primary">
              К каталогу
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div style={styles.itemsList}>
              {items.map((item) => (
                <CartLineItem
                  key={item.product.id}
                  item={item}
                  onQtyChange={updateQty}
                  onRemove={remove}
                />
              ))}
            </div>

            {/* Footer */}
            <div style={styles.footer}>
              <div style={styles.totalRow}>
                <span>Итого:</span>
                <Price value={subtotal()} size="lg" />
              </div>
              <Button fullWidth onClick={handleCheckout}>
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
  },
  drawer: {
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 50,
    height: '100%',
    width: '100%',
    maxWidth: 450,
    backgroundColor: '#0A0A0A',
    boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slide-in-right 0.3s ease-out',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #2A2A2A',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#999',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
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
  itemsList: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  footer: {
    borderTop: '1px solid #2A2A2A',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  totalRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 18,
    fontWeight: 600,
    color: 'white',
  },
};

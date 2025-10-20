import type { UICartItem } from '../../types/ui';
import { Price } from '../atoms/Price';

interface CartLineItemProps {
  item: UICartItem;
  onQtyChange: (productId: number, qty: number) => void;
  onRemove: (productId: number) => void;
}

export function CartLineItem({
  item,
  onQtyChange,
  onRemove,
}: CartLineItemProps) {
  const lineTotal = item.product.priceEffective * item.qty;

  return (
    <div style={styles.container}>
      {/* Thumbnail */}
      <div style={styles.thumbnail}>
        <img
          src={item.product.thumbnailUrl}
          alt={item.product.name}
          style={styles.image}
        />
      </div>

      {/* Info */}
      <div style={styles.info}>
        <div>
          <h4 style={styles.name}>
            {item.product.name}
          </h4>
          <Price value={item.product.priceEffective} size="sm" />
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.stepper}>
            <button
              onClick={() => onQtyChange(item.product.id, item.qty - 1)}
              style={styles.stepperButton}
            >
              −
            </button>
            <span style={styles.qty}>
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.product.id, item.qty + 1)}
              style={styles.stepperButton}
            >
              +
            </button>
          </div>

          <div style={styles.priceRow}>
            <Price value={lineTotal} size="md" />
            <button
              onClick={() => onRemove(item.product.id)}
              style={styles.removeButton}
            >
              <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    padding: 12,
  },
  thumbnail: {
    height: 80,
    width: 80,
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
    margin: 0,
    marginBottom: 4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    padding: 4,
  },
  stepperButton: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: 18,
    transition: 'background-color 0.2s',
  },
  qty: {
    width: 40,
    textAlign: 'center',
    fontWeight: 500,
    color: 'white',
    fontSize: 14,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  removeButton: {
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
};

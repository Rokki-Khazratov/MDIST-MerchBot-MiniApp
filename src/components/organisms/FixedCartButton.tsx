import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const FixedCartButton: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) {
    return null;
  }

  return (
    <button
      onClick={toggleCart}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#CE2F40',
        color: '#FFFFFF',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(206, 47, 64, 0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(206, 47, 64, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(206, 47, 64, 0.3)';
      }}
    >
      <div style={{ position: 'relative' }}>
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#FFFFFF',
              color: '#CE2F40',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '600',
              border: '2px solid #CE2F40',
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    </button>
  );
};

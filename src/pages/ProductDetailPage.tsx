import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProduct } from '../api/products';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import type { UIProduct } from '../types/ui';
import { Header } from '../components/organisms/Header';
import { CartDrawer } from '../components/organisms/CartDrawer';
import { Price } from '../components/atoms/Price';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const add = useCartStore((state) => state.add);
  const openCartDrawer = useUIStore((state) => state.openCartDrawer);

  const [product, setProduct] = useState<UIProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchProduct(parseInt(id))
      .then((p) => {
        if (!p) {
          navigate('/');
        } else {
          setProduct(p);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch product:', error);
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    add(product, qty);
    openCartDrawer();
  };

  if (loading || !product) {
    return (
      <div style={styles.page}>
        <Header />
        <main style={styles.main}>
          <div style={styles.skeleton}>
            <div style={styles.skeletonImage} />
            <div style={styles.skeletonText} />
            <div style={{ ...styles.skeletonText, width: '50%' }} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <Link to="/" style={styles.backLink}>
          <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Назад к каталогу</span>
        </Link>

        <div style={styles.grid}>
          {/* Image */}
          <div style={styles.imageContainer}>
            <img
              src={product.thumbnailUrl}
              alt={product.name}
              style={styles.image}
            />
          </div>

          {/* Info */}
          <div style={styles.info}>
            <div>
              <h1 style={styles.title}>
                {product.name}
              </h1>

              {/* Badges */}
              <div style={styles.badges}>
                {product.isNew && (
                  <Badge variant="outline" color="white">
                    NEW
                  </Badge>
                )}
                {product.discountPrice && (
                  <Badge variant="solid" color="red">
                    SALE
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div style={styles.priceContainer}>
                <Price value={product.priceEffective} size="lg" />
                {product.discountPrice && (
                  <Price value={product.price} size="md" strikethrough />
                )}
              </div>

              {/* Description */}
              <p style={styles.description}>
                {product.description}
              </p>
            </div>

            {/* Stock */}
            <div>
              {product.quantity > 0 ? (
                <p style={styles.stock}>
                  В наличии: {product.quantity} шт.
                </p>
              ) : (
                <p style={{ ...styles.stock, color: '#EF4444' }}>Нет в наличии</p>
              )}
            </div>

            {/* Qty Stepper */}
            <div>
              <label style={styles.label}>
                Количество
              </label>
              <div style={styles.stepper}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={styles.stepperButton}
                >
                  −
                </button>
                <span style={styles.qty}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(product.quantity, qty + 1))}
                  style={styles.stepperButton}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              fullWidth
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
            >
              Добавить в корзину
            </Button>
          </div>
        </div>
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
    maxWidth: 1000,
    margin: '0 auto',
    padding: 24,
  },
  skeleton: {
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  skeletonImage: {
    aspectRatio: '1',
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    marginBottom: 16,
  },
  skeletonText: {
    height: 32,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
    marginBottom: 16,
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: '#999',
    textDecoration: 'none',
    marginBottom: 24,
    transition: 'color 0.2s',
  },
  grid: {
    display: 'grid',
    gap: 32,
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  imageContainer: {
    aspectRatio: '1',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    color: 'white',
    marginBottom: 12,
  },
  badges: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 16,
  },
  description: {
    color: '#999',
    lineHeight: 1.6,
  },
  stock: {
    fontSize: 14,
    color: '#999',
  },
  label: {
    display: 'block',
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
    marginBottom: 8,
  },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    padding: 4,
    width: 'fit-content',
  },
  stepperButton: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: 20,
    transition: 'background-color 0.2s',
  },
  qty: {
    width: 48,
    textAlign: 'center',
    fontWeight: 500,
    color: 'white',
    fontSize: 16,
  },
};

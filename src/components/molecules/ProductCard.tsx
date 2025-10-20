import { Link } from 'react-router-dom';
import type { UIProduct } from '../../types/ui';
import { Price } from '../atoms/Price';
import { Badge } from '../atoms/Badge';

interface ProductCardProps {
  product: UIProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      style={styles.card}
    >
      {/* Image */}
      <div style={styles.imageContainer}>
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          style={styles.image}
          loading="lazy"
        />

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
      </div>

      {/* Info */}
      <div style={styles.info}>
        {/* Name */}
        <h3 style={styles.name}>
          {product.name}
        </h3>

        {/* Price */}
        <div style={styles.priceContainer}>
          <Price value={product.priceEffective} size="md" />
          {product.discountPrice && (
            <Price value={product.price} size="sm" strikethrough />
          )}
        </div>

        {/* Stock */}
        <p style={styles.stock}>
          {product.quantity > 0
            ? `В наличии (${product.quantity})`
            : 'Нет в наличии'}
        </p>
      </div>
    </Link>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'block',
    borderRadius: 16,
    border: '1px solid #2A2A2A',
    backgroundColor: '#1A1A1A',
    padding: 16,
    transition: 'all 0.3s',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
    aspectRatio: '1',
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  badges: {
    position: 'absolute',
    right: 8,
    top: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
  },
  stock: {
    fontSize: 12,
    color: '#999',
    margin: 0,
  },
};

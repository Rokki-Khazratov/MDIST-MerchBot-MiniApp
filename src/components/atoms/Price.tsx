import { formatCurrencyUZS } from '../../utils/currency';

interface PriceProps {
  value: number;
  strikethrough?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Price({
  value,
  strikethrough = false,
  size = 'md',
}: PriceProps) {
  const sizes: Record<string, React.CSSProperties> = {
    sm: {
      fontSize: 14,
    },
    md: {
      fontSize: 16,
    },
    lg: {
      fontSize: 24,
      fontWeight: 600,
    },
  };

  const style: React.CSSProperties = {
    ...sizes[size],
    color: strikethrough ? '#666' : 'white',
    textDecoration: strikethrough ? 'line-through' : 'none',
  };

  return (
    <span style={style}>
      {formatCurrencyUZS(value)}
    </span>
  );
}

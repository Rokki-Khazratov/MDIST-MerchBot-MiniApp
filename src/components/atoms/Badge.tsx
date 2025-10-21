import { type ReactNode } from 'react';

interface BadgeProps {
  variant?: 'solid' | 'outline';
  color?: 'white' | 'red' | 'green';
  children: ReactNode;
}

export function Badge({
  variant = 'solid',
  color = 'white',
  children,
}: BadgeProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    borderRadius: 12,
    padding: '4px 8px',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  };

  const variants: Record<string, Record<string, React.CSSProperties>> = {
    solid: {
      white: {
        ...baseStyle,
        backgroundColor: 'white',
        color: 'black',
      },
      red: {
        ...baseStyle,
        backgroundColor: '#EF4444',
        color: 'white',
      },
      green: {
        ...baseStyle,
        backgroundColor: '#10B981',
        color: 'white',
      },
    },
    outline: {
      white: {
        ...baseStyle,
        border: '1px solid white',
        color: 'white',
        backgroundColor: 'transparent',
      },
      red: {
        ...baseStyle,
        border: '1px solid #EF4444',
        color: '#EF4444',
        backgroundColor: 'transparent',
      },
      green: {
        ...baseStyle,
        border: '1px solid #10B981',
        color: '#10B981',
        backgroundColor: 'transparent',
      },
    },
  };

  return (
    <span style={variants[variant][color]}>
      {children}
    </span>
  );
}

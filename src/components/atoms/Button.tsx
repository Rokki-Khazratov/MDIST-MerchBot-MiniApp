import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: 12,
    fontWeight: 500,
    transition: 'all 0.2s',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    border: 'none',
    fontSize: 14,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      ...baseStyles,
      backgroundColor: 'white',
      color: 'black',
    },
    secondary: {
      ...baseStyles,
      backgroundColor: '#1A1A1A',
      color: 'white',
      border: '1px solid #2A2A2A',
    },
    ghost: {
      ...baseStyles,
      backgroundColor: 'transparent',
      color: 'white',
      border: '1px solid #2A2A2A',
    },
  };

  return (
    <button
      style={variants[variant]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}

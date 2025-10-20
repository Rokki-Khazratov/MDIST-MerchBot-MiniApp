import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  'aria-label': string;
  badge?: number;
}

export function IconButton({
  icon,
  badge,
  ...props
}: IconButtonProps) {
  return (
    <button
      style={styles.button}
      {...props}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span style={styles.badge}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    position: 'relative',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    display: 'flex',
    height: 20,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#EF4444',
    padding: '0 4px',
    fontSize: 11,
    fontWeight: 600,
    color: 'white',
  },
};

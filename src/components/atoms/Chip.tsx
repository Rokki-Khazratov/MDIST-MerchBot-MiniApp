interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({
  label,
  selected = false,
  onClick,
}: ChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.base,
        ...(selected ? styles.selected : styles.unselected),
      }}
    >
      {label}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 20px',
    borderRadius: 24,
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    whiteSpace: 'nowrap',
  },
  selected: {
    backgroundColor: 'white',
    color: 'black',
  },
  unselected: {
    backgroundColor: '#1A1A1A',
    color: 'white',
  },
};

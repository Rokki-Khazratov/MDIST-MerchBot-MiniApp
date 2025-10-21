import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Поиск...',
  debounce = 250,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounce);

    return () => clearTimeout(timer);
  }, [localValue, debounce, onChange]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div style={styles.container}>
      <input
        type="search"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        style={styles.input}
      />
      <svg
        style={styles.iconLeft}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          style={styles.clearButton}
        >
          <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '12px 40px',
    borderRadius: 12,
    border: '1px solid #2A2A2A',
    backgroundColor: '#1A1A1A',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  iconLeft: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 20,
    height: 20,
    color: '#888',
    pointerEvents: 'none',
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

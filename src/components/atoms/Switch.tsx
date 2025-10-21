import React from 'react';

interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  leftLabel: string;
  rightLabel: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  leftLabel,
  rightLabel,
  className = '',
}) => {
  return (
    <div className={className} style={{
      display: 'flex',
      backgroundColor: '#F5F5F5',
      borderRadius: '8px',
      padding: '4px',
      position: 'relative',
    }}>
      <button
        type="button"
        onClick={() => onChange(false)}
        style={{
          flex: 1,
          padding: '12px 16px',
          border: 'none',
          borderRadius: '6px',
          backgroundColor: value ? 'transparent' : '#FFFFFF',
          color: value ? '#666666' : '#000000',
          fontSize: '16px',
          fontWeight: value ? '500' : '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: value ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        style={{
          flex: 1,
          padding: '12px 16px',
          border: 'none',
          borderRadius: '6px',
          backgroundColor: value ? '#FFFFFF' : 'transparent',
          color: value ? '#000000' : '#666666',
          fontSize: '16px',
          fontWeight: value ? '600' : '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: value ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {rightLabel}
      </button>
    </div>
  );
};

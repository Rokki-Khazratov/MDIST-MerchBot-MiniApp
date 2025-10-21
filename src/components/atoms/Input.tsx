import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className = '',
  required = false,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `1px solid ${error ? '#CE2F40' : '#E5E5E5'}`,
          borderRadius: '8px',
          fontSize: '16px',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          transition: 'border-color 0.2s ease',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#CE2F40';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#CE2F40' : '#E5E5E5';
        }}
      />
      {error && (
        <p style={{
          color: '#CE2F40',
          fontSize: '14px',
          marginTop: '4px',
          marginBottom: 0,
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

// Backward-compatible export names
export function formatCurrencyUZS(value: number): string {
  const formatted = new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return `${formatted} сум`;
}

export function parsePrice(priceStr: string): number {
  return parseFloat(priceStr);
}

// Alias expected by components
export const formatPrice = (amount: number): string => {
  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} сум`;
};


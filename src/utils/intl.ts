export function toRubles(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    notation: 'compact',
    currencySign: 'accounting',
    minimumFractionDigits: 0,
  }).format(amount);
}

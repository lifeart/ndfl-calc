export function toRubles(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencySign: 'accounting',
    minimumFractionDigits: 0,
  }).format(amount);
}

export const formatCurrency = (amount, locale , currency , rate=26000) => {
  if (isNaN(amount)) return '0';
  const value= currency==='USD'?amount:amount*rate
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

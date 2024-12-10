export const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  // trailingZeroDisplay: 'stripIfInteger',
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

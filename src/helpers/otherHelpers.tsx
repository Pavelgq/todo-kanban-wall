export const priceToRub = (price: number): string => {
  return price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .concat(' ₽')
}

export const declinWord = (
  count: number,
  variants: [string, string, string]
): string => {
  const cases = [2, 1, 0, 0, 0, 2]
  return variants[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ]
}

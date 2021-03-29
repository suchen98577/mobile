export default function(price, n) {
  if (price) {
    return `${price.toFixed(n)}`;
  }
  else return `0.00`
}

export default function formatNumber(value) {
  const number = parseInt(value);
  return isNaN(number) ? value : number.toLocaleString();
}

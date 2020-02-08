export default function formatThousands(value) {
  // Format number with commas as thousands separator
  // https://stackoverflow.com/a/2901298/11560579
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


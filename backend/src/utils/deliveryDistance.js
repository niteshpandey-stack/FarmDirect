export function distanceKm(lat1, lng1, lat2, lng2) {
  const values = [lat1, lng1, lat2, lng2].map(Number);
  if (values.some(v => !Number.isFinite(v))) return null;
  const [a1, o1, a2, o2] = values.map(v => v * Math.PI / 180);
  const da = a2 - a1;
  const doo = o2 - o1;
  const h = Math.sin(da / 2) ** 2 + Math.cos(a1) * Math.cos(a2) * Math.sin(doo / 2) ** 2;
  return Number((6371 * 2 * Math.asin(Math.sqrt(h))).toFixed(2));
}

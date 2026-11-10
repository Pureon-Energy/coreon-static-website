/*
 * Illustrative day-curve for the chart: shifts the flexible share of load out of
 * peak-price hours into the cheapest hours, then accumulates cost hour by hour.
 */

const PRICE = [0.62, 0.58, 0.55, 0.54, 0.56, 0.68, 1.05, 1.42, 1.38, 1.12, 0.95, 0.86, 0.82, 0.8, 0.84, 0.98, 1.25, 1.62, 1.71, 1.48, 1.15, 0.92, 0.78, 0.68];
const LOAD = [22, 21, 20, 20, 22, 32, 62, 82, 86, 84, 80, 76, 72, 75, 80, 86, 90, 88, 78, 60, 42, 32, 26, 23];

export function chartData() {
  const shifted = [...LOAD];
  let pool = 0;
  PRICE.forEach((p, h) => {
    if (p >= 1.1) {
      const move = LOAD[h] * 0.6;
      shifted[h] -= move;
      pool += move;
    }
  });
  const cheap = PRICE.map((p, h) => [p, h] as const)
    .sort((a, b) => a[0] - b[0])
    .slice(0, 8)
    .map(([, h]) => h);
  cheap.forEach((h) => (shifted[h] += pool / cheap.length));

  const before = [0];
  const after = [0];
  PRICE.forEach((p, h) => {
    before.push(before[before.length - 1] + LOAD[h] * p);
    after.push(after[after.length - 1] + shifted[h] * p);
  });

  return {
    price: PRICE,
    before,
    after,
    saved: Math.round((1 - after[after.length - 1] / before[before.length - 1]) * 100),
  };
}

// Same geometry and rounding as the WordPress template, so the SVG output is identical.
export const CHART = { w: 800, h: 340, left: 8, right: 792, top: 24, bottom: 304 };

const round1 = (n: number) => Math.round(n * 10) / 10;

export function chartGeometry(data: ReturnType<typeof chartData>) {
  const { left, right, top, bottom } = CHART;
  const max = Math.max(...data.before) * 1.05;
  const x = (i: number, n: number) => round1(left + ((right - left) * i) / n);
  const y = (v: number) => round1(bottom - ((bottom - top) * v) / max);
  const line = (series: number[]) => "M" + series.map((v, i) => `${x(i, series.length - 1)},${y(v)}`).join(" L");
  const gap = (upper: number[], lower: number[]) => {
    const n = lower.length - 1;
    const back = lower.map((v, i) => `${x(i, n)},${y(v)}`).reverse();
    return `${line(upper)} L${back.join(" L")} Z`;
  };
  return { x, y, line, gap, priceMax: Math.max(...data.price) };
}

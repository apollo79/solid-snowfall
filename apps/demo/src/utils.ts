/**
 * rounds a value to a given step
 * @see https://stackoverflow.com/a/34591063/17797907
 * @example
 * `round(2.74, 0.1)` = 2.7
 * `round(2.74, 0.25)` = 2.75
 * `round(2.74, 0.5)` = 2.5
 * `round(2.74, 1.0)` = 3.0
 */
export function round(value: number, step?: number) {
  step ||= 1.0;
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

/**
 * finds the nearest number in an array
 * @see https://stackoverflow.com/a/39942209/17797907
 * @param x the needle to search the nearset value to
 * @param arr the haystack of numbers to search in
 * @returns
 */
export function getNearest(x: number, arr: number[]) {
  // the the difference of each number to x
  const indexArr = arr.map((k) => Math.abs(k - x));

  // find the smallest difference
  const min = Math.min(...indexArr);

  return arr[indexArr.indexOf(min)];
}

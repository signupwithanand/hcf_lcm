import type { PrimeMap } from '../types';

export const LCMEngine = {
  extractCoverage(a: PrimeMap, b: PrimeMap): PrimeMap {
    const result: PrimeMap = {};
    for (const prime of [2, 3, 5, 7, 11, 13] as const) {
      const maxPow = Math.max(a[prime] ?? 0, b[prime] ?? 0);
      if (maxPow > 0) result[prime] = maxPow;
    }
    return result;
  },

  multiply(map: PrimeMap): number {
    return ([2, 3, 5, 7, 11, 13] as const).reduce((acc, prime) => {
      const exp = map[prime] ?? 0;
      return acc * prime ** exp;
    }, 1);
  },
};

import type { Prime, PrimeMap } from '../types';

const allowedPrimes: Prime[] = [2, 3, 5, 7, 11, 13];

export const FactorizationEngine = {
  factorizeNumber(value: number): PrimeMap {
    if (value < 2 || value > 999) {
      throw new Error('Standard and intermediate values must stay between 2 and 999.');
    }

    let remaining = value;
    const result: PrimeMap = {};

    for (const prime of allowedPrimes) {
      while (remaining % prime === 0) {
        result[prime] = (result[prime] ?? 0) + 1;
        remaining /= prime;
      }
    }

    if (remaining !== 1) {
      throw new Error('Only values factorable by primes up to 13 are allowed in this module.');
    }

    return result;
  },

  toExpandedText(map: PrimeMap): string {
    return allowedPrimes
      .filter((prime) => map[prime])
      .map((prime) => `${prime}${(map[prime] ?? 0) > 1 ? `^${map[prime]}` : ''}`)
      .join(' × ');
  },
};

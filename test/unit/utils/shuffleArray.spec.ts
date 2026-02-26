import { describe, it, expect } from 'vitest';
import shuffleArray from '@/utils/shuffleArray';

describe('shuffle array', () => {
  it('raise an error on none-array inputs', () => {
    const call = shuffleArray as unknown as (arg?: any) => any;
    expect(() => call()).toThrow(TypeError);
  });

  it('returns a shuffled array', () => {
    const result = shuffleArray(['heads', 'tails']);
    expect(result).toEqual(expect.arrayContaining(['tails', 'heads']));
  });
});

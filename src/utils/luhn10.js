import debug from './debug';

const luhn10 = (number, even = false) => {
  if (number === 0) return 0;

  const digit = number % 10;
  const doubled = even ? digit * 2 : digit;
  const sum = doubled > 9 ? doubled - 9 : doubled;
  debug('luhn10')(number, digit, even, doubled, sum);
  return sum + luhn10(Math.floor(number / 10), !even);
};

export const checkSumLuhn10 = number => (luhn10(number) % 10 === 0);

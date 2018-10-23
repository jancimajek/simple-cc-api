import { checkSumLuhn10 } from '../luhn10';

describe('Luhn10', () => {
  it('Checksum correctly', () => {
    expect(checkSumLuhn10(79927398713)).toBe(true);

    expect(checkSumLuhn10(79927398710)).toBe(false);
    expect(checkSumLuhn10(79927398711)).toBe(false);
    expect(checkSumLuhn10(79927398712)).toBe(false);
    expect(checkSumLuhn10(79927398714)).toBe(false);
    expect(checkSumLuhn10(79927398715)).toBe(false);
    expect(checkSumLuhn10(79927398716)).toBe(false);
    expect(checkSumLuhn10(79927398717)).toBe(false);
    expect(checkSumLuhn10(79927398718)).toBe(false);
    expect(checkSumLuhn10(79927398719)).toBe(false);
  });
});

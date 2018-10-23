import Card from '../card';

describe('Create card', () => {
  it('should create new card with correct number, limit and balance when CC number is valid', () => {
    const card = new Card('name', 79927398713, 1000);

    expect(card.name).toBe('name');
    expect(card.number).toBe(79927398713);
    expect(card.limit).toBe(1000);
    expect(card.balance).toBe(0);
  });

  it('should throw error when CC number is invalid', () => {
    expect(() => new Card('name', 79927398710, 1000)).toThrow('Invalid card number: 79927398710');
  });
});

describe('Charge card', () => {
  it('should return correct balance', () => {
    const card = new Card('name', 79927398713, 1000);
    expect(card.charge(10)).toBe(10);
    expect(card.charge(10.01)).toBe(20.01);
    expect(card.charge(99.99)).toBe(120.00);
    expect(card.charge(880)).toBe(1000);
  });

  it('should throw error when charge goes over the limit', () => {
    const card = new Card('name', 79927398713, 1000);
    expect(() => card.charge(1000.01)).toThrow('Credit limit exceeded for card number: 79927398713');
  });
});

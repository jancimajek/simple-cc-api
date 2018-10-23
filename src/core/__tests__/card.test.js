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

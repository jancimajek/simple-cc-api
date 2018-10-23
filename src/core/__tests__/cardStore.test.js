import CardStore from '../cardStore';

describe('Card Store', () => {
  it('should be empty at beginning', () => {
    const cardStore = new CardStore();
    expect(cardStore.store).toEqual({});
  });
});

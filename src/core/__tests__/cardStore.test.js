import CardStore from '../cardStore';
import Card from '../card';
import { DuplicateCardError, CardDoesNotExistError } from '../errors';


describe('Card Store', () => {
  it('should be empty at beginning', () => {
    const cardStore = new CardStore();
    expect(cardStore.store).toEqual({});
  });

  it('should add a new card if it does not exist', () => {
    const cardStore = new CardStore();
    const card = new Card('name', 79927398713, 1000);
    cardStore.add(card);

    expect(cardStore.store.name).toBe(card);
  });

  it('should throw error when adding card that already exists', () => {
    const cardStore = new CardStore();
    const card = new Card('name', 79927398713, 1000);
    const card2 = new Card('name', 79927398713, 1000);
    cardStore.add(card);

    const addCard = c => () => cardStore.add(c);

    expect(addCard(card)).toThrow(DuplicateCardError);
    expect(addCard(card)).toThrow('Card already exists: name');
    expect(addCard(card2)).toThrow(DuplicateCardError);
    expect(addCard(card2)).toThrow('Card already exists: name');
  });

  it('should get all cards', () => {
    const cardStore = new CardStore();
    const card = new Card('name', 79927398713, 1000);
    const card2 = new Card('name2', 4539058051444578, 1000);

    expect(cardStore.getAll()).toEqual([]);

    cardStore.add(card);
    expect(cardStore.getAll()).toEqual([card]);

    cardStore.add(card2);
    expect(cardStore.getAll()).toEqual([card, card2]);
  });

  it('should get specific card if it exists', () => {
    const cardStore = new CardStore();
    const card = new Card('name', 79927398713, 1000);
    cardStore.add(card);

    expect(cardStore.get('name')).toBe(card);
  });

  it('should throw error when getting card that does not exist', () => {
    const cardStore = new CardStore();
    const getCard = () => cardStore.get('name');

    expect(getCard).toThrow(CardDoesNotExistError);
    expect(getCard).toThrow('Card does not exist: name');
  });
});

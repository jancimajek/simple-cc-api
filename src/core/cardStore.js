import { DuplicateCardError, CardDoesNotExistError } from './errors';

export default class CardStore {
  constructor() {
    this.store = {};
  }

  add(card) {
    const { name } = card;
    if (this.store[name]) {
      throw new DuplicateCardError(`Card already exists: ${name}`);
    }

    this.store[name] = card;
  }

  getAll() {
    return Object.values(this.store);
  }

  get(name) {
    if (!this.store[name]) {
      throw new CardDoesNotExistError(`Card does not exist: ${name}`);
    }
    return this.store[name];
  }
}

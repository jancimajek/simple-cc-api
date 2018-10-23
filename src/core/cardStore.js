export default class CardStore {
  constructor() {
    this.store = {};
  }

  add(card) {
    const { name } = card;
    if (this.store[name]) {
      throw new Error(`Card already exists: ${name}`);
    }

    this.store[name] = card;
  }
}

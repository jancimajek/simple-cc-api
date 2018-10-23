import { checkSumLuhn10 } from '../utils/luhn10';

export default class Card {
  constructor(name, number, limit, balance = 0) {
    if (!checkSumLuhn10(number)) {
      throw new Error(`Invalid card number: ${number}`);
    }

    this.name = name;
    this.number = number;
    this.limit = limit;
    this.balance = balance;
  }
}

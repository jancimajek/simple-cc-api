import debug from '../utils/debug';
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

  charge(ammount) {
    debug('card')('Charge', ammount);
    if (this.balance + ammount > this.limit) {
      throw new Error(`Credit limit exceeded for card number: ${this.number}`);
    }

    this.balance = Math.round((this.balance + ammount) * 100) / 100;
    return this.balance;
  }
}

export class InvalidCardNumberError extends Error {
  constructor(...args) {
    super(...args);
    this.httpCode = 400;
  }
}

export class CreditLimitExeededError extends Error {
  constructor(...args) {
    super(...args);
    this.httpCode = 400;
  }
}

export class DuplicateCardError extends Error {
  constructor(...args) {
    super(...args);
    this.httpCode = 409;
  }
}

export class CardDoesNotExistError extends Error {
  constructor(...args) {
    super(...args);
    this.httpCode = 404;
  }
}

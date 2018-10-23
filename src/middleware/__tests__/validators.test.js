import { ValidationError } from 'jsonschema';
import { createCardValidator, cardOperationValidator } from '../validators';

describe('createCardValidator', () => {
  it('should return a function', () => {
    expect(typeof createCardValidator()).toBe('function');
  });

  it('should not throw error and call next on valid input', () => {
    const req = {
      body: {
        name: 'card',
        number: '123',
        limit: '£1000.00',
      },
    };

    const next = jest.fn();
    const validate = () => createCardValidator()(req, {}, next);
    expect(validate).not.toThrow();
    expect(next).toHaveBeenCalled();
  });

  it.each([
    {},
    { name: 'card' },
    { name: 'card', number: '123' },
    { name: 'card', number: '123', limit: '123' },
    { name: 'card', number: '123', limit: '£123' },
    { name: 'card', number: '123', limit: '£123.0' },
    { name: 'card', number: '123', limit: '£123.000' },
    // @TODO add more cases
  ])('should throw error on invalid input', (body) => {
    const req = { body };

    const validate = () => createCardValidator()(req, {}, () => {});
    expect(validate).toThrow(ValidationError);
  });
});

describe('cardOperationValidator', () => {
  it('should return a function', () => {
    expect(typeof cardOperationValidator()).toBe('function');
  });

  it.each([
    {
      operation: 'charge',
      ammount: '£100.00',
    },
    {
      operation: 'credit',
      ammount: '£100.00',
    },
  ])('should not throw error and call next on valid input', (body) => {
    const req = { body };
    const next = jest.fn();
    const validate = () => cardOperationValidator()(req, {}, next);
    expect(validate).not.toThrow();
    expect(next).toHaveBeenCalled();
  });

  it.each([
    {},
    { operation: 'credit' },
    { ammount: '£100.00' },
    { operation: 'invalid', ammount: '£100.00' },
    { operation: 'charge', ammount: '100.00' },
    { operation: 'charge', ammount: '£100' },
    { operation: 'charge', ammount: '£100.0' },
    { operation: 'charge', ammount: '£100.000' },
    { operation: 'charge', ammount: 100 },
    // @TODO add more cases
  ])('should throw error on invalid input', (body) => {
    const req = { body };

    const validate = () => cardOperationValidator()(req, {}, () => {});
    expect(validate).toThrow(ValidationError);
  });
});

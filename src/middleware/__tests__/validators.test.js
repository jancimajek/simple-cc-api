import { ValidationError } from 'jsonschema';
import { createCardValidator } from '../validators';

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

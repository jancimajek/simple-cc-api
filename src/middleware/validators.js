import { Validator } from 'jsonschema';
import * as schemas from './validationSchemas';

const validateMiddleware = (validator, schema) => (req, res, next) => {
  validator.validate(
    req.body,
    schema,
    { throwError: true },
  );
  next();
};

export const createCardValidator = () => {
  const validator = new Validator();
  validator.addSchema(schemas.schemaAmmount, '/Ammount');
  return validateMiddleware(validator, schemas.schemaCreateCard);
};

export const cardOperationValidator = () => {
  const validator = new Validator();
  validator.addSchema(schemas.schemaAmmount, '/Ammount');
  return validateMiddleware(validator, schemas.schemaCardOperation);
};

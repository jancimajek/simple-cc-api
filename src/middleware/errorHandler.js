import { ValidationError } from 'jsonschema';

export default function (err, req, res, ignoreNext) {
  const { message, httpCode, stack } = err;
  res.status(httpCode || 400).json({
    error: err instanceof ValidationError ? `Validation error: ${stack}` : message,
  });
}

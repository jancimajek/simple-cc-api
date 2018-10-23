export const schemaAmmount = {
  id: '/Ammount',
  type: {
    type: 'string',
    pattern: '^£\\d+\\.\\d{2}$',
  },
};

export const schemaCardOperation = {
  id: '/CardOperation',
  type: 'object',
  properties: {
    operation: {
      type: 'string',
      enum: ['credit', 'charge'],
    },
    ammount: { $ref: '/Ammount' },
  },
  required: ['operation', 'ammount'],
};

export const schemaCreateCard = {
  id: '/CreateCard',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    number: {
      type: 'string',
      pattern: '^[0-9]{1,19}$',
    },
    limit: { $ref: '/Ammount' },
  },
  required: ['name', 'number', 'limit'],
};

# Simple Credit Card API

Simple API for a credit card provider

## 📲 Install
```bash
git clone https://github.com/jancimajek/simple-cc-api.git
cd simple-cc-api
yarn install
```

## ✅ Test
```bash
yarn test
```

or run all tests (verbose mode) with coverage
```bash
yarn test:coverage
```

## ▶️ Run
```bash
yarn start
```

## 🏗 Develop

Run the app in watch mode with debugging on
```bash
yarn debug
```

Run all tests in watch mode
```bash
yarn test:watch
```

## ⚙️ API

All endpoints expect and return Content type `application/json`. See `src/middleware/validationSchemas.js` for input validation schema.

### `GET /cards`

Returns list of all existing cards and their details

#### Response
- Status: `200`
- Body: array of all cards objects
  
  ```
  [
    {
      "name": "card",
      "number": 79927398713,
      "limit": 1000,
      "balance": 123.45
    },
    ...
  ]
  ```

### `POST /cards`

Creates new card

#### Payload

```
{
  "name": "card name",
  "number:" "79927398713",
  "limit": "£1000.00"
}
```

#### Response
- Status: `201`

#### Errors
- `400` - validation error, input either does not conform to the input JSON schema or the card number is invalid (doesn't pass luhn10 check). Check response body for details of the error.
- `409` - card with given name already exist

### `PUT /cards/:name`

Creates new card

#### Payload

```
{
  "operation": "credit|charge",
  "ammount": "£123.45"
}
```

#### Response
- Status: `200`
- Body: object with the card number and new balance after the operation:

  ```
  {
    "number": 79927398713,
    "balance": 123.45
  }
  ```

#### Errors
- `400` - validation error, input does not conform to the input JSON schema. Check response body for details of the error.
- `404` - card with given name does not exist


## 📖 Notes

 - This is a very primitive and naive implementation of a credit card provider API
 - It uses "classic" OO approach
 - It Uses extremely simple in-memory store


## 🔜 Todo / issues / potential improvements

 - [ ] Add more / improve tests
 - [ ] Add / improve output formatting (especially currency) so that it's consistent with input formatting
 - [ ] Improve API documentation
 - [ ] Replace in-memory card store with proper in-memory DB such as Redis
 - [ ] Use Redis's optimistic locking (WATCH/MULTI) to improve atomicity of transactions (CAS)
 - [ ] Alternatively, use persistent DB to back the store (sql or non-sql)
 - [ ] Rewrite using event sourcing pattern to improve scalability
 - [ ] Use node cluster to improve scalability and resiliency
 - [ ] Dockerise to further improve scalability and ease of deployment
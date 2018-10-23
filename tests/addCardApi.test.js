import request from 'supertest';
import app from '../src/app';

describe('Add credit card API', () => {
  it('should contain no cards at the start', async () => {
    const response = await request(app).get('/cards');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should validate input when adding card', async () => {
    const response = await request(app).post('/cards').send({
      name: '',
      number: '',
      limit: '',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Validation error: instance.name does not meet minimum length of 1');
  });

  it('should add valid cards', async () => {
    const [response, response2] = await Promise.all([
      request(app).post('/cards').send({
        name: 'card1',
        number: '79927398713',
        limit: '£1000.00',
      }),
      request(app).post('/cards').send({
        name: 'card2',
        number: '4539058051444578',
        limit: '£100.00',
      }),
    ]);
    expect(response.statusCode).toBe(201);
    expect(response2.statusCode).toBe(201);
  });

  it('should not add duplicate card', async () => {
    const response = await request(app).post('/cards').send({
      name: 'card1',
      number: '79927398713',
      limit: '£1000.00',
    });
    expect(response.statusCode).toBe(409);
  });

  it('should return added card', async () => {
    const response = await request(app).get('/cards');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        name: 'card1',
        number: 79927398713,
        limit: 1000,
        balance: 0,
      },
      {
        name: 'card2',
        number: 4539058051444578,
        limit: 100,
        balance: 0,
      },
    ]);
  });
});

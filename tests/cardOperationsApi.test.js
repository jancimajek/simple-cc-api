import request from 'supertest';
import app from '../src/app';

beforeAll(async () => {
  await request(app).post('/cards').send({
    name: 'card1',
    number: '79927398713',
    limit: '£1000.00',
  });
});

describe('Credit card operations API', () => {
  it('should validate input', async () => {
    const response = await request(app).put('/cards/card1').send({
      operation: '',
      ammount: '',
    });
    expect(response.statusCode).toBe(400);
  });

  it('should charge card', async () => {
    const response = await request(app).put('/cards/card1').send({
      operation: 'charge',
      ammount: '£10.00',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.number).toBe(79927398713);
    expect(response.body.balance).toBe(10);
  });

  it('should not go over limit', async () => {
    const response = await request(app).put('/cards/card1').send({
      operation: 'charge',
      ammount: '£990.01',
    });
    expect(response.statusCode).toBe(400);
  });

  it('should credit card', async () => {
    const response = await request(app).put('/cards/card1').send({
      operation: 'credit',
      ammount: '£1.00',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.number).toBe(79927398713);
    expect(response.body.balance).toBe(9);
  });

  it('should credit card into negative balance', async () => {
    const response = await request(app).put('/cards/card1').send({
      operation: 'credit',
      ammount: '£10.00',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.number).toBe(79927398713);
    expect(response.body.balance).toBe(-1);
  });


  it('should return card', async () => {
    const response = await request(app).get('/cards');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        name: 'card1',
        number: 79927398713,
        limit: 1000,
        balance: -1,
      },
    ]);
  });
});

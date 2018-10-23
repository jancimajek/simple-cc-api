import request from 'supertest';
import app from '../src/app';

describe('Add credit card API', () => {
  it('should contain no cards at the start', async () => {
    const response = await request(app).get('/cards');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

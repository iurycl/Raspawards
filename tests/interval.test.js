const request = require('supertest');
const app = require('../src/app');

describe('GET /api/producers/intervals', () => {
  it('should return producers with min and max award intervals', async () => {
    const response = await request(app).get('/api/producers/intervals');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);

    if (response.body.min.length > 0) {
      expect(response.body.min[0]).toHaveProperty('producer');
      expect(response.body.min[0]).toHaveProperty('interval');
      expect(response.body.min[0]).toHaveProperty('previousWin');
      expect(response.body.min[0]).toHaveProperty('followingWin');
    }

    if (response.body.max.length > 0) {
      expect(response.body.max[0]).toHaveProperty('producer');
      expect(response.body.max[0]).toHaveProperty('interval');
      expect(response.body.max[0]).toHaveProperty('previousWin');
      expect(response.body.max[0]).toHaveProperty('followingWin');
    }
  });
});
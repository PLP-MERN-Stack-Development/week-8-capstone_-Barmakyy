const request = require('supertest');
const app = require('../app'); // Import the Express app

describe('Auth API', () => {
  it('should return 400 for missing credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({}); // No credentials sent
    expect(res.statusCode).toBe(400);
    // Optionally: expect(res.body.message).toMatch(/required/i);
  });
});
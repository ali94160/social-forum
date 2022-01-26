const app = require('../../../app');
const supertest = require('supertest');
const request = supertest(app);
const session = require('supertest-session');
const { user1Login } = require('./mock_data');
const mongoose = global.mongoose;


describe('Test user authentication - Logout', () => {

  describe('You are logged in', () => {

    let testSession = null;
  
    beforeAll(function () {
      testSession = session(app);
    });

    test('/api/logout - logout OK', async () => {
      await testSession.post('/api/login').send(user1Login);
      const res = await testSession.delete('/api/logout');

      expect(res.statusCode).toBe(200);
    });

  });

  describe('You are NOT logged in', () => {
    test('/api/logout - logout not OK', async () => {
      const res = await request.delete('/api/logout');

      expect(res.statusCode).toBe(401);
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

});
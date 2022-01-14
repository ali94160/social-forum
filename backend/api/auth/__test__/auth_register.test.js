const app = require('../../../app');
const supertest = require('supertest');
const request = supertest(app);
const session = require('supertest-session');

describe("Test user authentication - Login", () => {

  // let testSession = null;
  

  // beforeAll(function () {
  //   testSession = session(app);
  // });

  test('Login - User credentials correct, no one is logged in', async () => {
    
  });

  




});
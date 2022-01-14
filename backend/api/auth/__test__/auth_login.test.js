const app = require('../../../app');
const supertest = require('supertest');
const request = supertest(app);
const session = require('supertest-session');
const { user1, user2, user1Login, user2Login, user3Login } = require('./mock_data');
const roles = require('../../../models/role');
const mongoose = global.mongoose;


// beforeAll(async () => {
//   connection = await mongoose.connection.readyState =
// })

// afterAll(() => {
//   mongoose.connection.close();
// })

describe("Test user authentication - Login", () => {

  describe('Correct credentials', () => {
    let testSession = null;   
 
    beforeAll(function() {
      testSession = session(app);
    });

    test('/api/login - No one is logged in', async () => {
        const res = await testSession.post("/api/login").send(user1Login);
  
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({});
    });

    test('/api/whoAmI - Someone is logged in', async () => {
      const res = await testSession.get("/api/whoAmI");

      expect(res.statusCode).toBe(200);
      expect(res.body.username).toEqual(user1.username);
      expect(res.body.email).toBe(undefined);
      expect(res.body.password).toBe(undefined);
      expect(res.body.roles[0]).toBe(roles.USER);
    });

    test('/api/login - Someone is already logged in', async () => {
      const res = await testSession.post("/api/login").send(user2Login);

      expect(res.statusCode).toBe(400);
    });
  });

  describe("Wrong credentials", () => {
  
    test('/api/login - No one is logged in', async () => {
      const res = await request.post("/api/login").send(user3Login);
  
      expect(res.statusCode).toBe(400)
    });
  });
});


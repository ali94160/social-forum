const app = require('../../../app');
const supertest = require('supertest');
const request = supertest(app);
const session = require('supertest-session');
const User = require('../../../models/user');
const { newUser, bannedUser } = require('./mock_data');
const roles = require('../../../models/role');
const mongoose = global.mongoose;


describe("Test user authentication - Register", () => {

  describe('User information is correct', () => {
    let testSession = null;
  
    beforeAll(function () {
      testSession = session(app);
    });

    test('/api/register - user email or username doesnt exist in db', async () => {
      // removing user from db (if exist) because we're using our real db
      await User.findOneAndDelete({ email: newUser.email });

      const res = await testSession.post("/api/register").send(newUser);
      const user = await User.findOne({ email: newUser.email });
      const whoAmI = await testSession.get("/api/whoAmI");
      

      expect(res.statusCode).toBe(200);
      expect(user._id).toBeDefined();
      expect(user.email).toEqual(newUser.email);
      expect(user.password).not.toBe(newUser.password);
      expect(user.roles[0]).toBe(roles.USER);
      // // so the user doesnt get automatically logged in after registration
      expect(whoAmI.body).toEqual({});
    });

    test('/api/register - email and username already exist in db', async () => {
      const res = await testSession.post("/api/register").send(newUser);

      expect(res.statusCode).toBe(400);
    });
  })

  describe('Email exists in banlist', () => {

    test('/api/register - register with banned email', async () => {
      const res = await request.post('/api/register').send(bannedUser);

      expect(res.statusCode).toBe(403);
    });
  });

});
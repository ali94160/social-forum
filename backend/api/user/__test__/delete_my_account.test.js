const app = require("../../../app");
const session = require("supertest-session");
const User = require("../../../models/user");
const mongoose = global.mongoose;


const {
  testUser,
  testLogin,
  wrongConfirmationPassword,
  correctConfirmationPassword,
} = require("./mock_data");
const e = require("express");

describe("Test if a user can delete his/her account.", () => {
  let testSession = null;

  beforeAll(async function () {
    testSession = session(app);

    // removing user from db (if exist) because we're using our real db
    await User.findOneAndDelete({ email: testUser.email }).exec();
    await testSession.post("/api/register").send(testUser);
  });

  test("To not allow a unauthorized user to delete his/her account", async () => {
    await testSession.delete("/api/logout");
    const res = await testSession.delete("/api/user/self");
    expect(res.statusCode).toBe(401);
  });

  test("To try to delete account with providing wrong confirmation password", async () => {
    await testSession.delete("/api/logout");
    await testSession.post("/api/login").send(testLogin);
    const res = await testSession
      .delete("/api/user/self")
      .send(wrongConfirmationPassword);
    expect(res.statusCode).toBe(403);
  });

  test("To try to delete account with providing no password", async () => {
    await testSession.delete("/api/logout");
    await testSession.post("/api/login").send(testLogin);
    const res = await testSession.delete("/api/user/self");
    expect(res.statusCode).toBe(403);
  });

  describe("Correct credentials", () => {
    test("To try to delete account with providing right password", async () => {
      await testSession.delete("/api/logout");
      await testSession.post("/api/login").send(testLogin);
      const res = await testSession
        .delete("/api/user/self")
        .send(correctConfirmationPassword);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toEqual("Success");
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});

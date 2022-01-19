const app = require("../../../app");
const session = require("supertest-session");
const { testLogin2 } = require("./mock_data");
describe("Test if a user can can search for another user", () => {
  let testSession = null;

  beforeAll(async function () {
    testSession = session(app);
  });

  test("user is not logged in", async () => {
    const res = await testSession.get("/api/user/isabella");
    expect(res.statusCode).toBe(401);
  });

  test("user is logged in", async () => {
    await testSession.post("/api/login").send(testLogin2);
    const res = await testSession.get("/api/user/isabella");

    expect(res.body.username).toBe("isabella");
    expect(res.body._id).toBeDefined();
    expect(res.statusCode).toBe(200);
  });

  test("user is logged in and search for a user that does not exists", async () => {
    const res = await testSession.get("/api/user/Isabella");

    expect(res.body).toBe(null);
    expect(res.statusCode).toBe(200);
  });
});

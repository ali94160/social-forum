const app = require("../../../app");
const session = require("supertest-session");
const { user1Login, admin } = require("../../auth/__test__/mock_data");
const { categoryToAdd } = require("./mock_data");

describe("Test to delete a category", () => {
  let testSession = null;

  beforeAll(function () {
    testSession = session(app);
  });

  test("Test to delete a category as a user", async () => {
    await testSession.post("/api/login").send(user1Login);
    const res = await testSession.delete(
      "/api/categories/61ee63a8cb7dfdd399175cab"
    );
    expect(res.statusCode).toBe(401);
  });

  test("Test to delete a category as a admin", async () => {
    await testSession.delete("/api/logout");
    await testSession.post("/api/login").send(admin);
    const categoryResponse = await testSession
      .post("/api/categories")
      .send(categoryToAdd);
    const res = await testSession.delete(
      `/api/categories/${categoryResponse.body._id}`
    );
    expect(res.statusCode).toBe(200);
  });
});

const app = require("../../../app");
const session = require("supertest-session");
const { user1Login, admin } = require("../../auth/__test__/mock_data");
const { category_success } = require("./mock_data");
const categoryModel = require('../../../models/category')
const mongoose = global.mongoose;


describe("Test to add a category", () => {
  let testSession = null;

  beforeAll(async () => {
    testSession = session(app);
    await categoryModel.findOneAndDelete({title: category_success.title})

  });

  test("Test to add a category as a user", async () => {
    await testSession.post("/api/login").send(user1Login);
    const res = await testSession.post(
      "/api/categories").send(category_success);
    expect(res.statusCode).toBe(401);
  });

  test("Test to add a category as a admin", async () => {
    await testSession.delete("/api/logout");
    await testSession.post("/api/login").send(admin);
    const categoryResponse = await testSession
      .post("/api/categories")
      .send(category_success);
    expect(categoryResponse.statusCode).toBe(200);
    expect(categoryResponse.body.title).toEqual(category_success.category.title);
  });


  afterAll(async () => {
    await categoryModel.findOneAndDelete({ title: category_success.category.title })
    mongoose.connection.close();
  })
  
});

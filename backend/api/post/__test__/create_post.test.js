const app = require("../../../app");
const session = require("supertest-session");
const Post = require("../../../models/post");
const { user1Login } = require("../../auth/__test__/mock_data");
const { post } = require("./mock_data");
const mongoose = global.mongoose;


describe("Test if a user can create a post", () => {
  let testSession = null;
  let postId;

  beforeAll(function () {
    testSession = session(app);
  });

  test("To not allow a unauthorized user to create a post", async () => {
    const res = await testSession.post("/api/user/posts").send(post);
    postId = res.body._id;
    expect(res.statusCode).toBe(401);
  });

  test("To successfully create a post", async () => {
    await testSession.post("/api/login").send(user1Login);
    const res = await testSession.post("/api/user/posts").send(post);
    const { body } = await testSession.get("/api/whoAmI");
    await Post.findByIdAndDelete(postId);
    expect(res.statusCode).toBe(200);
    expect(body.roles).toEqual(expect.arrayContaining(["POSTOWNER"]));
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});

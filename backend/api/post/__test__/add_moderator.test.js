const app = require("../../../app");
const session = require("supertest-session");
const Post = require("../../../models/post");
const User = require("../../../models/user");
const { user3, user4 } = require("../../auth/__test__/mock_data");
const { post, moderatorIds } = require("./mock_data");
const mongoose = global.mongoose;


describe("Test if a user can create a post", () => {
  let testSession = null;
  let postResponse;

  beforeAll(function () {
    testSession = session(app);
  });

  test("To check if a user gets the correct role", async () => {
    await testSession.post("/api/login").send(user3);
    postResponse = await testSession.post("/api/user/posts").send(post);
    const { body } = await testSession.get("/api/whoAmI");
    expect(postResponse.statusCode).toBe(200);
    expect(body.roles).toEqual(expect.arrayContaining(["POSTOWNER"]));
    await testSession.delete("/api/logout");
  });

  test("Check if a user has the moderator role", async () => {
    await testSession.post("/api/login").send(user3);
    await testSession
      .put(`/api/posts/${postResponse.body._id}/moderators`)
      .send(moderatorIds);
    await Post.findById(postResponse.body._id);
    const user = await testSession.get(`/api/users/username/${user4.username}`);
    const moderator = await User.findById(user.body._id); 
    expect(moderator.roles).toContain("POSTMODERATOR");
  });

  test("User has the correct roles after deleting a post", async () => {
    await testSession.delete(`/api/posts/${postResponse.body._id}`);
    const { body } = await testSession.get("/api/whoAmI");
    const user = await testSession.get(`/api/users/username/${user4.username}`);
    const moderator = await User.findById(user.body._id); 
    expect(body.roles).not.toEqual(expect.arrayContaining(["POSTOWNER"]));
    expect(moderator.roles).not.toContain("POSTMODERATOR");
    await Post.findByIdAndDelete(postResponse.body._id);
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});

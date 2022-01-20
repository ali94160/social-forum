const app = require("../../../app");
const { expect } = require("@jest/globals");
const supertest = require("supertest");
const session = require("supertest-session");
const request = supertest(app);
const { post, postId, wrongPostId, moderatorsList1, moderatorsList2 } = require("./mock_data");
const { user1Login } = require("../../auth/__test__/mock_data");
const postModel = require("../../../models/post");


describe("Handle moderators", () => {
  test("If user is not logged in", async () => {
    const res = await request.put("/api/posts/" + postId + "/moderators");
    expect(res.statusCode).toBe(401);
  });
  
  let testSession = null;
  let newPost;

  beforeAll(async () => {
    testSession = session(app);
  });

  test("When post id does not exist", async () => {
    await testSession.post("/api/login").send(user1Login);
    const res = await testSession.put("/api/posts/" + wrongPostId + "/moderators");
    expect(res.statusCode).toBe(404);
  });

  test("That two post-moderators is added by a post-owner", async () => {
    await testSession.post("/api/login").send(user1Login);
    newPost = await testSession.post("/api/user/posts").send(post);
    const res = await testSession.put("/api/posts/" + newPost.body._id + "/moderators").send(moderatorsList1);
    const result = await postModel.findOne({ _id: newPost.body._id }).lean().exec();
    expect(res.statusCode).toBe(200);
    expect(result.moderatorsIds).toHaveLength(1);
  });

  test("That post-owner can update moderators", async () => {
    await testSession.post("/api/login").send(user1Login);
    const res = await testSession.put("/api/posts/" + newPost.body._id + "/moderators").send(moderatorsList2);
    const result = await postModel.findOne({ _id: newPost.body._id }).lean().exec();
    expect(res.statusCode).toBe(200);
    expect(result.moderatorsIds).toHaveLength(2);
    // await postModel.deleteMany({ title: "postTestTitle" }).exec();
  })

  afterAll(done => {  
  mongoose.connection.close()
  done()
})

})
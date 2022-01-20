const app = require("../../../app");
const { expect } = require("@jest/globals");
const supertest = require("supertest");
const session = require("supertest-session");
const request = supertest(app);
const { post, postId, wrongPostId, moderatorsList1, moderatorsList2 } = require("./mock_data");
const { user1Login } = require("../../auth/__test__/mock_data");
const postModel = require("../../../models/post");


describe("Handle moderators", () => {
  test("That visitor can not reach endpoint when not logged in", async () => {
    const res = await request.put("/api/posts/" + postId + "/moderators");
    expect(res.statusCode).toBe(401);
  });
  
  let testSession = null;
  let newPost;

  beforeAll(async () => {
    testSession = session(app);
  });

  test("That post is not found when none existing post-id is sent", async () => {
    await testSession.post("/api/login").send(user1Login);
    const res = await testSession.put("/api/posts/" + wrongPostId + "/moderators");
    expect(res.statusCode).toBe(404);
  });

  test("That post-owner can add moderators", async () => {
    await testSession.post("/api/login").send(user1Login);
    newPost = await testSession.post("/api/user/posts").send(post);
    const res = await testSession.put("/api/posts/" + newPost.body._id + "/moderators").send(moderatorsList2);
    const result = await postModel.findOne({ _id: newPost.body._id }).lean().exec();
    expect(res.statusCode).toBe(200);
    expect(result.moderatorsIds).toHaveLength(2);
  });
  
  test("That post-owner can remove moderators", async () => {
    await testSession.post("/api/login").send(user1Login);
    const res = await testSession.put("/api/posts/" + newPost.body._id + "/moderators").send(moderatorsList1);
    const result = await postModel.findOne({ _id: newPost.body._id }).lean().exec();
    expect(res.statusCode).toBe(200);
    expect(result.moderatorsIds).toHaveLength(1);
    await postModel.deleteMany({ title: "postTestTitle" }).exec();
  })

  afterAll(done => {  
  mongoose.connection.close()
  done()
})

})
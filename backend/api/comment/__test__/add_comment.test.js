const app = require("../../../app");
const session = require("supertest-session");
const { newComment, wrongComment, testPost } = require("./mock_data");
const Comment = require("../../../models/comment");
const Post = require("../../../models/post");
const { user1Login } = require("../../auth/__test__/mock_data");

describe("Test to add a comment", () => {
  let testSession = null;
  let post = null;
  let comment = newComment;

  beforeAll(function() {
    testSession = session(app);
  });
  test("/api/comments - user is not logged in", async () => {
    const res = await testSession.post("/api/comments").send(comment);
    expect(res.statusCode).toBe(401);
  });
  
  test("/api/comments - user is logged in", async () => {
    await testSession.post("/api/login").send(user1Login);
    const user = await testSession.get("/api/whoAmI");

    // create test post in db
    const postRes = await testSession.post("/api/user/posts").send(testPost);
    post = postRes.body;
    comment.postId = post._id + ""

    // create test comment
    const res = await testSession.post("/api/comments").send(comment);
    const commentRes = res.body;
    await Comment.findByIdAndDelete(res.body._id);
    await Post.findByIdAndDelete(post._id);

    expect(postRes.statusCode).toBe(200);
    expect(res.statusCode).toBe(200);
    expect(commentRes._id).toBeDefined();
    expect(commentRes.postId + "").toMatch(newComment.postId + "");
    expect(commentRes.writerId + "").toMatch(user.body._id + "");
    expect(commentRes.comment).toEqual(comment.comment);
  });

  test("/api/comments - post don't exist", async () => {
    const user = await testSession.get("/api/whoAmI");
    const res = await testSession.post("/api/comments").send(wrongComment);
    expect(user).toBeDefined()
    expect(res.statusCode).toBe(400);
  });

  afterAll(done => {
    mongoose.connection.close()
    done()
  })
});

const app = require("../../../app");
const session = require("supertest-session");
const supertest = require("supertest");
const request = supertest(app);
const Post = require("../../../models/post")
const Comment = require("../../../models/comment")
const { user1Login, testPost, newComment } = require("./mock_data");


describe("Test to get comments from post", () => {
  
  describe("/api/post/comments/:postId", () => {
    let testSession = null;
    let post = null;
    let comment = null;

    beforeAll(function async() {
      testSession = session(app);
    });
    test("prepp", async () => {
      const whoAmIRes = await testSession.get("/api/whoAmI");
      const loginRes = await testSession.post("/api/login").send(user1Login);

      const postRes = await testSession.post("/api/user/posts").send(testPost);
      post = postRes.body;

      let comment = { ...newComment, postId: post._id };
      const commentRes = await testSession.post("/api/comments").send(comment);
      expect(whoAmIRes.statusCode).toBe(401);
      expect(loginRes.statusCode).toBe(200);
      expect(postRes.statusCode).toBe(200);
      expect(post._id).toBeDefined();
      expect(commentRes.statusCode).toBe(200);
    });

    test("/api/post/comments/:postId - anonymous and there are comments", async () => {
      const res = await request.get("/api/post/comments/" + post._id);
      comment = res.body[0];
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(Object.keys(res.body[0])).toEqual([
        "_id",
        "content",
        "writerId",
        "createdDate",
        "postId",
        "__v",
      ]);
      expect(res.body[0].postId.toString()).toBe(post._id);
    });

    test("/api/post/comments/:postId - user get and there are comments", async () => {
      const whoAmIRes = await testSession.get("/api/whoAmI");
      const res = await testSession.get("/api/post/comments/" + post._id);
      expect(res.statusCode).toBe(200);
      expect(Object.keys(res.body[0])).toEqual([
        "_id",
        "content",
        "writerId",
        "createdDate",
        "postId",
        "__v",
      ]);
      expect(whoAmIRes.statusCode).toBe(200);
      expect(res.body[0].postId.toString()).toBe(post._id);
      await Comment.findByIdAndDelete(comment._id);
    });

    test("There are no comments", async () => {
      const res = await request.get("/api/post/comments/" + post._id);
      expect(res.statusCode).toBe(204);
      await Post.findByIdAndDelete(post._id);
    });

    test("Wrong post id", async () => {
      const res = await request.get("/api/post/comments/123");
      expect(res.statusCode).toBe(404);
    });
  });

});

const app = require("../../../app");
const supertest = require("supertest");
const request = supertest(app);
const session = require("supertest-session");
const { user1Login, post, user2Login } = require("./mock_data");
const postModel = require("../../../models/post");

describe("Test delete posts", () => {
  describe("Not allow unauthenticated user delete post", () => {
    test("/api/posts/123", async () => {
      const res = await request.delete("/api/posts/123");
      expect(res.statusCode).toBe(401);
    });
  });

  describe("User delete not existing post", () => {
    let testSession = null;
    beforeAll(function () {
      testSession = session(app);
    });
    test("/api/posts/123", async () => {
      await testSession.post("/api/login").send(user2Login);
      const res = await testSession.delete("/api/posts/123");
      expect(res.statusCode).toBe(403);
    });
  });

  describe("Authenticated user", () => {
    let testSession = null;

    beforeAll(function () {
      testSession = session(app);
    });

    test("/api/posts/id - create post then delete", async () => {
      await testSession.post("/api/login").send(user2Login);
      const newPost = await testSession.post("/api/user/posts").send(post);
      const res = await testSession.delete("/api/posts/" + newPost.body._id);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Wrong user delete post", () => {
    let testSession = null;

    beforeAll(function () {
      testSession = session(app);
    });

    test("/api/posts/id - create post then delete by another user", async () => {
      await testSession.post("/api/login").send(user2Login);

      const newPost = await testSession.post("/api/user/posts").send(post);

      await testSession.delete('/api/logout');

      await testSession.post("/api/login").send(user1Login);
      const res = await testSession.delete("/api/posts/" + newPost.body._id);

      await postModel.findOneAndDelete({ title: post.title })
      
      expect(res.statusCode).toBe(403);
    });
  });
});

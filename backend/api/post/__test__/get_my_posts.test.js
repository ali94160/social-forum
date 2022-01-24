const app = require("../../../app");
const { expect } = require("@jest/globals");
const supertest = require("supertest");
const session = require("supertest-session");
const Post = require("../../../models/post");
const mongoose = global.mongoose;


const { user2Login, post } = require("./mock_data");
const request = supertest(app);

describe("Test getting users own posts", () => {
  describe("Get post when user not logged in", () => {
    test("GET api/user/posts - Should get error", async () => {
      const res = await request.get("/api/user/posts");

      expect(res.statusCode).toBe(401);
    });
  });

  describe("Get posts owner by user", () => {
    let testSession = null;
    beforeAll(async () => {
      testSession = session(app);

      // delete all the test posts in db
      await Post.findOneAndDelete({ title: post.title });
      // login the user first and create a test post
      await testSession.post("/api/login").send(user2Login);
      await testSession.post("/api/user/posts").send(post);
    });

    test("GET api/user/posts", async () => {
      const res = await testSession.get("/api/user/posts");
      const postResult = res.body[0];

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(postResult.ownerId.username).toBe(user2Login.username);
      expect(postResult.title).toBe(post.title);
      expect(postResult.content).toBe(post.content);
      expect(postResult.categoryId).toBe(post.categoryId);
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});

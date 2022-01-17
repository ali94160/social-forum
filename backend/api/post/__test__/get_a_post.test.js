const app = require("../../../app");
const { expect } = require("@jest/globals");
const supertest = require("supertest");
const request = supertest(app);
const { postId } = require("./mock_data")

describe("Get one post based on id", () => {
  
  test("To get a post based on id", async () => {
    const res = await request.get("/api/posts/" + postId);
    expect(res.statusCode).toBe(200);
  });

  test("To not return sensitive data of post owner", async () => {
    const res = await request.get("/api/posts/" + postId);
    expect(res.body.ownerId.email).not.toBeDefined();
    expect(res.body.ownerId.password).not.toBeDefined();
  })

  test("So post has all requied fields", async () => {
    const res = await request.get("/api/posts/" + postId);
    expect(res.body).toHaveProperty('title', 'content', 'createdDate', 'ownerId');
  })

  test("To get a post with a non existing id", async () => {
    const res = await request.get("/api/posts" + postId + "abc");
    expect(res.statusCode).toBe(404);
  })
})
const app = require("../../../app");
const { expect } = require("@jest/globals");
const supertest = require("supertest");
const request = supertest(app);

describe("Test delete posts", () => {
  describe("Delete posts", () => {
    test("/api/posts/id - ", async () => {
      let res = await request.get("/api/posts");
      expect(res.statusCode).toBe(200);
    });
  });
});

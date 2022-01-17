const app = require("../../../app.js");
const { expect } = require("@jest/globals");
const supertest = require("supertest");
const request = supertest(app);

describe("test post APIs", () => {

  test("GET /api/posts", async () => {
    // const res = await request.get("/api/posts");
    // expect(res.length).toBeGreaterThan(0);
  });
  test("GET /api/posts with sort by title then createdDate", async () => {
    // const res = await request.get("/api/posts");
    // expect(res.length).toBeGreaterThan(0);
  });


});

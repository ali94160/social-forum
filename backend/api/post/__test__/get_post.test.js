const app = require("../../../app");
const { expect } = require("@jest/globals");
const supertest = require("supertest");
const request = supertest(app);

describe("Test get posts", () => {
  describe("Get posts", () => {
    test("/api/posts - all data has required & correct properties", async () => {
      let res = await request.get("/api/posts");
      expect(res.statusCode).toBe(200);
      res.body.forEach((post) => {
        expect(post._id).toBeDefined();
        expect(typeof post._id).toBe("string");

        expect(post.title).toBeDefined();
        expect(typeof post.title).toBe("string");

        expect(post.ownerId).toBeDefined();
        if (typeof ownerId === "object") {
          expect(post.ownerId._id).toBeDefined();
          expect(typeof post.ownerId._id).toBe("string");
          expect(post.ownerId.username).toBeDefined();
          expect(typeof post.ownerId.username).toBe("string");
        }
        expect(post.createdDate).toBeDefined();
        expect(typeof post.createdDate).toBe("string");

        expect(post.content).toBeDefined();
        expect(typeof post.content).toBe("string");
      });
    });
  });

  describe("Get posts with correct query", () => {
    test("/api/posts?title=asc&createdDate=desc - sorting by title first asc then date desc", async () => {
      const res = await request.get("/api/posts?title=asc&createdDate=desc");

      const expected = res.body.slice().sort((a, b) => {
        return (
          a.title.localeCompare(b.title) ||
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(expected);
    });

    test("/api/posts?createdDate=asc&title=desc - sorting by created date asc first then title desc", async () => {
      let res = await request.get("/api/posts?createdDate=asc&title=desc");
      const expected = res.body.slice().sort((a, b) => {
        return (
          new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() ||
          b.title.localeCompare(a.title)
        );
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(expected);
    });
  });

  describe("Get posts with incorrect query", () => {
    test("/api/posts?title=123 - wrong parameter values", async () => {
      let res = await request.get("/api/posts?title=123");
      expect(res.statusCode).toBe(400);
    });
  });
});

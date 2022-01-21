const app = require("../../../app");
const mongoose = global.mongoose;
const supertest = require("supertest");
const request = supertest(app);
const session = require("supertest-session");
const commentModel = require("../../../models/comment");
const postModel = require("../../../models/post");
const { newComment } = require("./mock_data");
const { user1Login } = require("../../auth/__test__/mock_data");

const randomComment = async () => {return await commentModel.findOne({}).exec();}

  describe("Not allow unauthenticated user to delete comment", () => {
    test("/api/user/comments/" + randomComment._id, async () => {
      const res = await request.delete("/api/user/comments/" + randomComment._id);
      expect(res.statusCode).toBe(401);
    });
  });

  describe("User authenticated", () => {
      let testSession = null;
      beforeAll(async function () {
        testSession = session(app);
        await testSession.post("/api/login").send(user1Login);
    });

    describe("User trying to delete non existing comment", () => {
      test("/api/user/comments/" + randomComment._id, async () => {
        const res = await testSession.delete("/api/user/comments/" + randomComment._id + 'abc');
        expect(res.statusCode).toBe(403);
      });
    });

    describe("User enters complete rubbish comment id", () => {
      test("/api/user/comments/" + randomComment._id, async () => {
        const res = await testSession.delete("/api/user/comments/" + Math.random());
        expect(res.statusCode).toBe(500);
      });
    });

    describe("User creates a comment and then removes it", () => {
      test("/api/user/comments/:id", async () => {
        const randomPost = await postModel.findOne({}).exec();
        if (!randomPost){
          return;
        }
        const comment = await testSession.post("/api/comments").send({...newComment, postId: randomPost._id});
        const res = await testSession.delete("/api/user/comments/" + comment.body._id);
        expect(res.statusCode).toBe(200);
      });
    });

    
    afterAll(async function () {
      await testSession.post("/api/logout")
      testSession = null;
      mongoose.connection.close();
  });
  });
const app = require("../../../app");
const session = require("supertest-session");
const { newComment } = require("./mock_data");
const CommentModel = require("../../../models/comment");
const { user1Login } = require("../../auth/__test__/mock_data");

describe("Test to add a comment", () => {
  let testSession = null;

  beforeAll(function () {
    testSession = session(app);
  });
  test("/api/comments - user is not logged in", async () => {
    const res = await testSession.post("/api/comments").send(newComment);
    expect(res.statusCode).toBe(401);
  });

  test("/api/comments - user is logged in", async () => {
    await testSession.post("/api/login").send(user1Login);
    const res = await testSession.post("/api/comments").send(newComment);
    const comment = await CommentModel.findOne({
      comment: newComment.comment,
    });
    await CommentModel.findOneAndDelete({ comment: newComment.comment });

    expect(res.statusCode).toBe(200);
    expect(comment._id).toBeDefined();
    expect(comment.comment).toEqual(newComment.comment);
  });
});

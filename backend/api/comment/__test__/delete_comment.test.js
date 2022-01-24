const app = require("../../../app");
const mongoose = global.mongoose;
const session = require("supertest-session");
const User = require("../../../models/user");
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
const role = require("../../../models/role")
const {
  testPostOwner,
  testPostModerator,
  testUser,
  newComment,
  testPost,
} = require("./mock_data");
const { hashUtil } = require("../../utils");

describe("Test to delete comment as post owner or post moderator", () => {
  let postOwner;
  let postModerator;
  let normalUser;
  let post;
  let comment1;
  let comment2;

  let testSession = null;
  beforeAll(async function () {
    testSession = session(app);

    await User.deleteMany({username: testPostOwner.username})
    await User.deleteMany({username: testPostModerator.username})
    await User.deleteMany({username: testUser.username})
    
    await User.deleteMany({email: testPostOwner.email})
    await User.deleteMany({email: testPostModerator.email})
    await User.deleteMany({email: testUser.email})
    // Create test users
    postOwner = new User({...testPostOwner, password: hashUtil(testPostOwner.password), roles: [role.USER, role.POSTOWNER]})
    postModerator = new User({...testPostModerator,password: hashUtil(testPostModerator.password), roles: [role.USER, role.POSTMODERATOR]})
    normalUser = new User({...testUser,password: hashUtil(testUser.password), roles: [role.USER]})
    await postOwner.save();
    await postModerator.save();
    await normalUser.save();

    const today = Date.now()
    // Create post by post owner, add postModerator
    post = new Post({...testPost, ownerId: postOwner._id, moderatorsIds: [postModerator._id], createdDate: today})
    await post.save();

    // Create two comments
    comment1 = new Comment({...newComment, postId: post._id, writerId: normalUser._id, createdDate: today})
    comment2 = new Comment({...newComment, postId: post._id, writerId: normalUser._id, createdDate: today})
    comment1.save()
    comment2.save()
  });

    test("Delete comment as writer", async () => {
      await testSession.post("/api/login").send(testUser);
      const res = await testSession.delete("/api/comments/" + comment1._id);
      await testSession.delete("/api/logout");

      expect(res.statusCode).toBe(401);
    });

    test("Delete comment as post owner", async () => {
      await testSession.post("/api/login").send(testPostOwner);
      const res = await testSession.delete("/api/comments/" + comment1._id);
      await testSession.delete("/api/logout");
      expect(res.statusCode).toBe(200);
    });

    test("Delete comment as post moderator", async () => {
      await testSession.post("/api/login").send(testPostModerator);
      const res = await testSession.delete("/api/comments/" + comment2._id);
      await testSession.delete("/api/logout");
      expect(res.statusCode).toBe(200);
    });

  afterAll(async function () {
    testSession = null;
    await User.findByIdAndDelete(postOwner._id)
    await User.findByIdAndDelete(postModerator._id)
    await User.findByIdAndDelete(normalUser._id)
    await Post.findByIdAndDelete(post._id)
    await Comment.findByIdAndDelete(comment1._id)
    await Comment.findByIdAndDelete(comment2._id)
    mongoose.connection.close();
  });
});

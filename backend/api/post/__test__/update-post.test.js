const app = require("../../../app");
const session = require("supertest-session");
const Post = require("../../../models/post");
const { user1Login } = require("../../auth/__test__/mock_data");
const { post, updPost, postId, wrongPostId } = require("./mock_data");
const roles = require('../../../models/role');

describe("Test if a user can update their post", () => {
  let testSession = null;
  let user = null;
  let createdPost = null;

  beforeAll(async function () {
    testSession = session(app);
    await testSession.post('/api/login').send(user1Login);
    user = await testSession.get('/api/whoAmI');
    createdPost = await testSession.post('/api/user/posts').send(post);
  });

  afterAll(async function () {
    await Post.findOneAndDelete({ _id: createdPost.body._id });
  });

  describe('One user', () => {
    test('/api/posts/id logged in user can successfully update their post', async () => {
      const updRes = await testSession.put(`/api/posts/${createdPost.body._id}`).send(updPost);

      expect(updRes.statusCode).toBe(200);
      expect(updRes.body.title).toEqual(updPost.title);
      expect(updRes.body.content).toEqual(updPost.content);
      expect(user.body.roles).toContain(roles.POSTOWNER);
    });

    test('/api/posts/id user cannot update because post not exists', async () => {
      const updRes = await testSession.put(`/api/posts/${wrongPostId}`).send(updPost);

      expect(updRes.statusCode).toBe(404);
    });

    test('/api/posts/id user cannot update because not logged in', async () => {
      await testSession.delete('/api/logout');
      const updRes = await testSession.put(`/api/posts/${createdPost.body._id}`).send(updPost);
      
      expect(updRes.statusCode).toBe(401);
    });
  });

  
  describe('Two users', () => {
    test('/api/posts/id user cannot update post they don\'t own', async () => {
      await testSession.post('/api/login').send(user1Login);
      const updRes = await testSession.put(`/api/posts/${postId}`).send(updPost);
  
      expect(updRes.statusCode).toBe(401);
      expect(user.body._id).not.toBe(updRes.body.ownerId);
    });
  });
});

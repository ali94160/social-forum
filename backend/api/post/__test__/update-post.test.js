const app = require("../../../app");
const session = require("supertest-session");
const Post = require("../../../models/post");
const { user1Login, wrongPostId } = require("../../auth/__test__/mock_data");
const { post, updPost } = require("./mock_data");
const roles = require('../../../models/role');

describe("Test if a user can update their post", () => {
  let testSession = null;

  beforeAll(function () {
    testSession = session(app);
  });

  test('/api/posts/id logged in user can successfully update their post', async () => {
    await testSession.post('/api/login').send(user1Login);
    const user = await testSession.get('/api/whoAmI');
    const res = await testSession.post('/api/user/posts').send(post);
    
    const updRes = await testSession.put(`/api/posts/${res.body._id}`).send(updPost);

    expect(updRes.statusCode).toBe(200);
    expect(updRes.body.title).toEqual(updPost.title);
    expect(updRes.body.content).toEqual(updPost.content);
    expect(user.body.roles).toContain(roles.POSTOWNER);

  });

  test('/api/posts/id user cannot update because post not exists', () => {

  });

  test('/api/posts/id user cannot update because not logged in', () => {

  });

  test('/api/posts/id user cannot update post they don\'t own', () => {

  });

});

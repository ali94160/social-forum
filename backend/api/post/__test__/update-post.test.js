const app = require("../../../app");
const session = require("supertest-session");
const Post = require("../../../models/post");
const { user1Login, wrongPostId, postId } = require("../../auth/__test__/mock_data");
const { post, updPost } = require("./mock_data");
const roles = require('../../../models/role');

describe("Test if a user can update their post", () => {
  let testSession = null;
  let user = null;
  let createdPost = null;

  beforeEach(async function () {
    testSession = session(app);
    await testSession.post('/api/login').send(user1Login);
    user = await testSession.get('/api/whoAmI');
    createdPost = await testSession.post('/api/user/posts').send(post);
  });

  afterEach(async function () {
    await testSession.delete('/api/logout');
    testSession = null;
  });

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
  
  test('/api/posts/id user cannot update post they don\'t own', async () => {
    await testSession.post('/api/login').send(user1Login);
    user = await testSession.get('/api/whoAmI');
    console.log('who is logged in', user.body)
    const updRes = await request.put(`/api/posts/${postId}`).send(updPost);

    expect(updRes.statusCode).toBe(404);
    expect(user.body._id).not.toBe(updRes.body.ownerId);

    // post owner is same as logged in ???? maybe something with the session???? remove created posts after each bla

  });

});

const newComment = {
  content: "testMockDataWillBeRemoved",
};
const wrongComment = {
  content: "testMockDataWillBeRemoved",
  postId: "123",
};

const testComment1 = {
  content: "b-firstCommentedTestComment"
};

const testComment2 = {
  content: "a-secondCommentedTestComment",
};

const testPost = {
  title: "postTestTitleForComment",
  content: "postTestContent",
  categoryId: "61dc3a622f8ecad1bc1367b2",
};

const user1Login = {
  email: "isabella@haha.se",
  password: "123",
};


module.exports = {
  newComment,
  wrongComment,
  testPost,
  user1Login,
  testComment1,
  testComment2,
};
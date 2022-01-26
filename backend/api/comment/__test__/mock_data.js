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
  categoryId: "61eef564a81e0c95199d558e",
};

const testPostOwner = {
  username: "testUserLogin1 for delete comment",
  email: "testUserLogin1@haha.com",
  password: "123"
}

const testPostModerator = {
  username: "testUserLogin2 for delete comment",
  email: "testUserLogin2@haha.com",
  password: "123"
}

const testUser = {
  username: "testUserLogin3 for delete comment",
  email: "testUserLogin3@haha.com",
  password: "123"
}

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
  testPostOwner,
  testPostModerator,
  testUser
};
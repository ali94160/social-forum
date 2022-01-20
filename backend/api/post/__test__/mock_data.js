const post = {
  title: "postTestTitle",
  content: "postTestContent",
  categoryId: "61dc3a622f8ecad1bc1367b2",
};

const updPost = {
  title: "new post title",
  content: "new content",
  categoryId: "61dc3a622f8ecad1bc1367b2",
}

const user2Login = {
  email: "post-tester@haha.se",
  username: "post-tester",
  password: "123"
}

const user1Login = {
  email: "isabella@haha.se",
  password: "123",
};

const postId = "61e51b44d7e4aef1f1fc1005"

const wrongPostId = "62e51b44d7e4aef1f1fc1005"

const moderatorsList1 = { moderatorsIds: ["61e5229bb2af1db642834c8d"]}
const moderatorsList2 = { moderatorsIds: ["61e5229bb2af1db642834c8d", "61e16838095050c88bfc4961"] }

module.exports = {
  post,
  postId,
  user2Login,
  user1Login,
  updPost,
  wrongPostId,
  moderatorsList1,
  moderatorsList2
};
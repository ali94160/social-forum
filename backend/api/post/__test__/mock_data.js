const post = {
  title: "postTestTitle",
  content: "postTestContent",
  categoryId: "61eef564a81e0c95199d558e",
};

const post2 = {
  title: "postTestTitle2",
  content: "postTestContent2",
  categoryId: "61eef564a81e0c95199d558e",
};

const updPost = {
  title: "new post title",
  content: "new content",
  categoryId: "61eef564a81e0c95199d558e",
};

const user2Login = {
  email: "post-tester@haha.se",
  username: "post-tester",
  password: "123",
};

const user1Login = {
  email: "isabella@haha.se",
  password: "123",
};

const postId = "61f05388fc0a68a6e45031b1";
const wrongPostId = "62e51b44d7e4aef1f1fc1005";

const moderatorIds = { moderatorsIds: ["61f05174fc0a68a6e4503118"] }; // Pelles id
const moderatorsList0 = { moderatorsIds: [] };
const moderatorsList1 = { moderatorsIds: ["61e5229bb2af1db642834c8d"] }; // masons id
const moderatorsList2 = {
  moderatorsIds: ["61e5229bb2af1db642834c8d", "61f1001567b3fc51d63dd2f6"],
}; // masons & pontus ids

module.exports = {
  post,
  post2,
  updPost,
  user1Login,
  user2Login,
  postId,
  wrongPostId,
  moderatorIds,
  moderatorsList0,
  moderatorsList1,
  moderatorsList2,
};

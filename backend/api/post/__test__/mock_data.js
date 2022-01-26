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

const postId = "61ea8424131ed617f9b03f6e";
const wrongPostId = "62e51b44d7e4aef1f1fc1005";

const moderatorIds = { moderatorsIds: ["61eab4571eba7fe8c8dc9047"] };
const moderatorsList0 = { moderatorsIds: [] };
const moderatorsList1 = { moderatorsIds: ["61e5229bb2af1db642834c8d"] }; // masons id
const moderatorsList2 = {
  moderatorsIds: ["61e5229bb2af1db642834c8d", "61e16838095050c88bfc4961"],
}; // masons & quiling ids

module.exports = {
  post,
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

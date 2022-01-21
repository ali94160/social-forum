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

const user1Login = {
  email: "isabella@haha.se",
  password: "123",
};

const user2Login = {
  email: "post-tester@haha.se",
  username: "post-tester",
  password: "123"
}

const postId = "61ea7d53fcdcf6ff25d72c9e"
const wrongPostId = "62e51b44d7e4aef1f1fc1005"

const moderatorsList0 = { moderatorsIds: [] }
const moderatorsList1 = { moderatorsIds: ["61e5229bb2af1db642834c8d"] } // masons id
const moderatorsList2 = { moderatorsIds: ["61e5229bb2af1db642834c8d", "61e16838095050c88bfc4961"] } // masons & quiling ids

module.exports = {
  post,
  updPost,
  user1Login,
  user2Login,
  postId,
  wrongPostId,
  moderatorsList0,
  moderatorsList1,
  moderatorsList2
};
const categoryToAdd = {
  category: {
    title: "categoryTest",
    icon: "hej"
  },
  password: process.env.SECRETPASSWORD
};

const category_success = {
  category: {
    title: "hej hej yo",
    icon: "test"
  },
  password: process.env.SECRETPASSWORD
}

module.exports = {
  categoryToAdd,
  category_success
};
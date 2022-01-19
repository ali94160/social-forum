const testUser = {
  username: "tester",
  email: "test@test.se",
  password: "123",
};

const testLogin = {
  email: "test@test.se",
  password: "123",
};

const testLogin2 = {
  email: "isabella@haha.se",
  password: "123",
};

const wrongConfirmationPassword = {
  password: "12345",
};

const correctConfirmationPassword = {
  password: "123",
};

module.exports = {
  testUser,
  testLogin,
  wrongConfirmationPassword,
  correctConfirmationPassword,
  testLogin2,
};

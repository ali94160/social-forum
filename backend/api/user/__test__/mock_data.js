const test_user = {
  username: "tester",
  email: "test@test.se",
  password: "123"
};

const test_login = {
  email: "test@test.se",
  password: "123"
};

const wrong_confirmation_password = {
  password: "12345"
}

const correct_confirmation_password = {
  password: "123"
}

module.exports = { test_user, test_login, wrong_confirmation_password, correct_confirmation_password };

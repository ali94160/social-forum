// correct credentials
const user1Login = {
  email: "isabella@haha.se",
  password: "123"
}

// correct credentials
const user2Login = {
  email: "bextex@haha.se",
  password: "123"
}

// wrong credentials
const user3Login = {
  email: "blabla@haha.se",
  password: "123"
}

const user1 = {
  username: 'isabella',
  email: "isabella@haha.se",
  password: "123"
}

const user2 = {
  username: 'bex',
  email: "bextex@haha.se",
  password: "123"
}

const bannedUser = {
  username: 'bex',
  email: "bex@haha.se",
  password: "123"
}

module.exports = {
  user1Login,
  user2Login,
  user3Login,
  user1,
  user2,
  bannedUser
}
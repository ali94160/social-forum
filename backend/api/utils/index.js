const crypto = require("crypto");

const hashUtil = (password) => {
    return crypto
    .createHmac("sha256", process.env.SECRET)
    .update(password)
    .digest("hex");
  }

  module.exports = {
      hashUtil
  }
const Ban = require('../models/ban')

const entries = {}

const MINIMUM_WAIT_DURATION = 500; // ms
const MAXIMUM_ATTEMPTS = 50;
const MINUTE_IN_MS = 60 * 60 * 1000;

const ban = async (ip) => {
  let banningIp = new Ban({ email: ip });
  await banningIp.save();
};

module.exports = async (req, res, next) => {
  // ip = 1 -> localhost
  let ip = req.ip.split(':').pop();
  
  // is it in the banlist?
  let isBanned = await Ban.findOne({ email: ip }).exec();
  
  if (isBanned) {
    return; // Leaves the Client hanging on loading
  }

  if (!entries[ip]) {
    entries[ip] = {attempts: []}
  }

  entries[ip].attempts.push(new Date().getTime())

  if (entries[ip].attempts.length > 0) {
    let sum = 0;
    for (let i = 1; i < entries[ip].attempts.length; i++) {
      let attempt = entries[ip].attempts[i];
      let prevAttempt = entries[ip].attempts[i - 1];
      sum += attempt - prevAttempt;
    }
    
    let frequency = sum / entries[ip].attempts.length;
    console.log("frequency ", frequency);
    console.log("entries[ip].attempts.length ", entries[ip].attempts.length);
    
    if (entries[ip].attempts.length > MAXIMUM_ATTEMPTS && frequency < MINIMUM_WAIT_DURATION * 2) {
      return
    }
    
    if (entries[ip].attempts.length > MAXIMUM_ATTEMPTS * 10 && frequency < MINIMUM_WAIT_DURATION * 3) {
      await ban(ip);
    }

    if (entries[ip].attempts.length > MAXIMUM_ATTEMPTS * 100 && frequency < MINUTE_IN_MS) {
      await ban(ip);
    }
  }

  next();
}
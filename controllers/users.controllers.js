const fs = require("fs");

// users data file read
function getUsers() {
  const data = fs.readFileSync(__dirname + "/../users.json");
  const users = JSON.parse(data);
  return users;
}

// get all users
module.exports.getAllUsers = (req, res, next) => {
    const { limit } = req.query;
    if (limit) {
        res.status(200).send(users.slice(0, limit));
    } else {
        res.status(200).send(users);
    }
}

// get random user
module.exports.getRandomUser = (req, res) => {
    const users = getUsers();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    res.send(randomUser);
  };
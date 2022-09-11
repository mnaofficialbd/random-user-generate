const fs = require("fs");

// users data file read
function getUsers() {
    const data = fs.readFileSync(__dirname + "/../users.json");
    const users = JSON.parse(data);
    return users;
}

// GET: random user
module.exports.getRandomUser = (req, res) => {
    const users = getUsers();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    res.send(randomUser);
};


// GET: all users
module.exports.getAllUsers = (req, res, next) => {
    const { limit } = req.query;
    if (limit) {
        res.status(200).send(users.slice(0, limit));
    } else {
        res.status(200).send(users);
    }
}

// POST: save a user
module.exports.saveAUser = (req, res) => {

}

// PATCH: update a user
module.exports.updateAUser = (req, res) => {

}

// PATCH: bulk update
module.exports.bulkUpdate = (req, res) => {

}

// DELETE: delete a user
module.exports.deleteAUser = (req, res) => {

}

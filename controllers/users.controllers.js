const fs = require("fs");

// users data file read
function getUsers() {
    const data = fs.readFileSync(__dirname + "/../users.json");
    const users = JSON.parse(data);
    return users;
}

// GET: all users
module.exports.getAllUser = (req, res) => {
    if (req.query.num === undefined) {
        const users = getUsers();
        res.send(users);
    } else {
        const users = getUsers();
        const usersToBeShown = req.query.num;
        const result = users.splice(0, usersToBeShown);
        res.send(result);
    }
};

// GET: random user
module.exports.getRandomUser = (req, res) => {
    const users = getUsers();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    res.send(randomUser);
};

// POST: save a user
module.exports.saveAUser = (req, res) => {
    const user = req.body;

    if ( !user.id || !user.name || !user.gender || !user.contact || !user.address || !user.photoUrl ) {
        res.send("User missing");
    } else {
        const users = getUsers();
        users.push(user);
        fs.writeFileSync("users.json", JSON.stringify(users));
        res.status(200).send("User save successfull");
    }
};

// PATCH: update a user
module.exports.updateAUser = (req, res) => {
    const newInfo = req.body;
    const userId = req.query.id;
    const users = getUsers();
    const parsedId = JSON.parse(req.query.id);

    if (typeof parsedId == "object") {
        return res.send("Provide a number in the query");
    }
    const foundUser = users.find(
        (user) => parseInt(user.id) === parseInt(userId)
    );

    if (!foundUser) {
        res.send("User not found");
    } else {
        if (newInfo.id) { foundUser.id = newInfo.id; }
        if (newInfo.name) { foundUser.name = newInfo.name; }
        if (newInfo.gender) { foundUser.gender = newInfo.gender; }
        if (newInfo.contact) { foundUser.contact = newInfo.contact; }
        if (newInfo.address) { foundUser.address = newInfo.address; }
        if (newInfo.photoUrl) { foundUser.photoUrl = newInfo.photoUrl; }
        fs.writeFileSync("users.json", JSON.stringify(users));
        res.status(200).send("User update successfull");
    }
};

// PATCH: bulk update
module.exports.bulkUpdate = (req, res) => {
    const userIDs = req.body.ids;
    const users = getUsers();

    for (let i = 0; i < userIDs.length; i++) {
        const userID = userIDs[i];
        const foundUser = users.find(
            (user) => parseInt(user.id) === parseInt(userID)
        );
        if (!foundUser) {
            return res.send("Provide the id that exists in the json file");
        }
    }
    res.send("User is found");
};

// DELETE: delete a user
module.exports.deleteAUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id !== Number(id));
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.status(200).send('User deleted successfull');
};

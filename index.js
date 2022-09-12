const express = require("express");
const cors = require("cors");
const app = express();
const usersRoute = require("./routes/v1/users.route")
const port = process.env.PORT || 5000;
const fs = require("fs");
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", usersRoute);

app.get("/", (req, res) => {
    res.send("Random user generator server is running");
});

app.all("*", (req, res) => {
    res.send("Route not found");
});

app.listen(port, () => {
    console.log("Server is running ", port);
});

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
})
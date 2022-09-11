const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");
app.use(cors());
app.use(express.json());


app.listen(port, (req, res) => {
    console.log("Random user generator server is running successfull");
  });
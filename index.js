const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
    console.log(`listening on ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/Pages/Home.html");
});

app.get("/write", (req, res) => {
    res.sendFile(__dirname + "/src/Pages/Write.html");
});

app.post("/add", (req, res) => {
    res.sendFile(__dirname + "/src/Pages/Add.html");
    console.log(req.body.title);
    console.log(req.body.date);
});

const express = require("express");
const bodyParser = require("body-parser");
const { saveOneData, findAll } = require("./src/utils/dbUtils");

const app = express();
const dbName = "todoapp";
const colName = "post";
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
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
    const sampleData = { title: req.body.title, date: req.body.date };
    saveOneData(dbName, colName, sampleData);
});

app.get("/list", (req, res) => {
    findAll(dbName, colName).then((e) => {
        res.json(e);
    });
});

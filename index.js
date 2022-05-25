const express = require("express");
const bodyParser = require("body-parser");
const dbUtil = require("./src/utils/saveData");

const app = express();
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
    dbUtil.saveOneData("todoapp", "post", sampleData);
});

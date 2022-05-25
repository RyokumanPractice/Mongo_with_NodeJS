import idPassword from "./idPassword";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

const url = `mongodb+srv://${idPassword.id}:${idPassword.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;

function saveOneData(dbName, colName, data) {
    const MongoClient = require("mongodb").MongoClient;
    MongoClient.connect(url, (err, client) => {
        if (err) {
            return console.log(err);
        }

        const db = client.db(dbName);

        db.collection(colName).insertOne(data, (err, result) => {
            if (err) {
                return console.log(err);
            }
            console.log("저장완료");
        });

        return;
    });
}

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
    saveOneData("todoapp", "post", sampleData);
});

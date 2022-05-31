require("dotenv").config();

const url = `mongodb+srv://${process.env.id}:${process.env.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient; // mongoDB 가져오기

function saveOneData(dbName, colName, data) {
    MongoClient.connect(url, (err, client) => {
        if (err) return console.log(err); // 에러 시

        const db = client.db(dbName);

        db.collection(colName).insertOne(data, (err, result) => {
            if (err) return console.log(err);
            console.log("저장완료");
        });

        return;
    });
}

function getOneData() {}

function getEveryData(dbName, colName) {
    let hello;

    MongoClient.connect(url, (err, client) => {
        if (err) console.log(err);

        const db = client.db(dbName);
        const result = db
            .collection(colName)
            .find()
            .toArray((err, result) => {
                hello = result;
            });
    });
    setTimeout(() => {
        console.log(hello);
        return hello;
    }, 500);
}

module.exports = { saveOneData: saveOneData, getEveryData: getEveryData };

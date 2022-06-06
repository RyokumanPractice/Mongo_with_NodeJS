require("dotenv").config();

const url = `mongodb+srv://${process.env.id}:${process.env.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient; // mongoDB 가져오기

const dbName = process.env.dbName;
const colName = "user";

function findByUserId(id) {
    const promise = new Promise((resolve) => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            bool = db.collection(colName).findOne({ _id: id });
            resolve(bool);
            return;
        });
    });

    return promise;
}

function addUser(id, pw, nickName, img) {
    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);
        db.collection(colName).findOne({ _id: id });
        return;
    });
}

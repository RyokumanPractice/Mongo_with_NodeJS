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

function findById(dbName, colName, id) {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            resolve(db.collection(colName).findOne({ _id: id }));
            return;
        });
    });
    return promise;
}

function findAll(dbName, colName) {
    const getData = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            resolve(db.collection(colName).find());
            return;
        });
    });

    const promise = new Promise((resolve, reject) => {
        getData.then((e) => {
            e.toArray((err, result) => {
                resolve(result);
            });
        });
    });

    return promise;
}

module.exports = {
    saveOneData: saveOneData,
    findAll: findAll,
    findById: findById,
};
require("dotenv").config();

const url = `mongodb+srv://${process.env.id}:${process.env.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;

console.log(url);
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

module.exports = { saveOneData: saveOneData };

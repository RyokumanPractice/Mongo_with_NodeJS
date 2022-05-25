const idPassword = require("../../idPassword");
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

module.exports = { saveOneData: saveOneData };

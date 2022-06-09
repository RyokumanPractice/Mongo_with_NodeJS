require("dotenv").config();

const url = `mongodb+srv://${process.env.id}:${process.env.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient; // mongoDB 가져오기

const defaultImage =
    "/Users/ryokuman/Desktop/dev/2. study/node_with_apple/backEnd/src/assets/img/sample.png";
const dbName = process.env.dbName;
const colName = "user";

function isExistId(id) {
    const promise = new Promise((resolve) => {
        MongoClient.connect(url, (err, client) => {
            let result;
            const db = client.db(dbName);
            db.collection(colName).findOne({ _id: id }) == null
                ? (result = false)
                : (result = true);
            resolve(result);
            return;
        });
    });

    return promise;
}

function isExistNickName(nickName) {
    const promise = new Promise((resolve) => {
        MongoClient.connect(url, (err, client) => {
            let result;
            const db = client.db(dbName);
            db.collection(colName).findOne({ nickName: nickName }) == null
                ? (result = false)
                : (result = true);
            resolve(result);
            return;
        });
    });

    return promise;
}

function findUser(cases, value) {
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
                switch (cases) {
                    case "all":
                        resolve(result);
                        break;
                    case "id":
                        resolve(result.filter((v) => v._id.includes(value)));
                        break;
                    case "nickname":
                        resolve(
                            result.filter((v) => v.nickName.includes(value))
                        );
                        break;
                    default:
                        console.error("there is no cases!!!!!");
                }
            });
        });
    });

    return promise;
}

function addUser(id, pw, nickName, img) {
    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);

        db.collection(colName).insertOne({
            _id: id,
            pw: pw,
            nickName: nickName,
            img: img == null ? defaultImage : img,
            follow: [],
            follwer: [],
        });

        return;
    });
}

module.exports = {
    addUser,
    isExistId,
    isExistNickName,
    findUser,
};

require("dotenv").config();

const url = `mongodb+srv://${process.env.id}:${process.env.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient; // mongoDB 가져오기

const dbName = process.env.dbName;
const colName = "post";

function addPost(title, content, writer, img) {
    const promise = new Promise((resolve) => {
        postNumAdd();
        MongoClient.connect(url, (err, client) => {
            if (err) console.log(err);
            const db = client.db(dbName);
            db.collection("idController").findOne(
                {
                    _id: `${process.env.postNumId}`,
                },
                (err, result) => {
                    resolve(result.num);
                }
            );
            return;
        });
    }).then((e) => {
        MongoClient.connect(url, (err, client) => {
            if (err) console.log(err);
            const db = client.db(dbName);
            db.collection(colName).insertOne({
                _id: e,
                title: title,
                content: content,
                writer: writer,
                img: img,
                like: [],
                comment: [], // commentnumber
            });
            console.log(`${e} has been added`);
            return;
        });
    });
}

function modPost(id) {}

function findByPostContent(content) {}

function findByPostTitle(title) {}

function findByPostWriter(writer) {}

function findByPostId(id) {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            resolve(db.collection(colName).findOne({ _id: id }));
            return;
        });
    });
    return promise;
}

function findAllPost() {
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

function deleteByPostId(id) {
    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);
        db.collection(colName).deleteOne({ _id: id });
        postNumDel();
        return;
    });
}

function postNumAdd() {
    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);

        db
            .collection("idController")
            .updateOne(
                { _id: `${process.env.postNumId}` },
                { $inc: { num: 1, totalPost: 1 } }
            ),
            (err) => {
                if (err) console.log(err);
            };

        return;
    });
}

function postNumDel() {
    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);

        db
            .collection("idController")
            .updateOne(
                { _id: `${process.env.postNumId}` },
                { $inc: { totalPost: -1 } }
            ),
            (err) => {
                if (err) console.log(err);
            };

        return;
    });
}

module.exports = {
    findAllPost: findAllPost,
    findByPostId: findByPostId,
    deleteByPostId: deleteByPostId,
    addPost: addPost,
};

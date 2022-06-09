require("dotenv").config();

const url = `mongodb+srv://${process.env.id}:${process.env.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient; // mongoDB 가져오기

const dbName = process.env.dbName;
const colName = "post";

function addPost(title, content, writer, img) {
    postNumAdd(true).then((e) => {
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

function modPost(id, title, content, img) {
    MongoClient.connect(url, (err, client) => {
        if (err) console.log(err);

        const db = client.db(dbName);
        db.collection(colName).updateOne(
            { _id: id },
            {
                $set: {
                    title: title,
                    content: content,
                    img: img,
                },
            }
        );
    });
}

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

function findPost(cases, value) {
    const getData = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            switch (cases) {
                case "all":
                    resolve(db.collection(colName).find());
                    break;
                case "content":
                    resolve(db.collection(colName).find({ content: value }));
                    break;
                case "title":
                    resolve(db.collection(colName).find({ title: value }));
                    break;
                case "writer":
                    resolve(db.collection(colName).find({ writer: value }));
                    break;
                default:
                    console.error("there is no cases!!!!!");
            }
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

function postNumAdd(isreturn) {
    const promise = new Promise((resolve) => {
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
            if (isreturn)
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
    });

    return promise;
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
    findPost,
    findByPostId,
    deleteByPostId,
    addPost,
    modPost,
    postNumAdd,
    postNumDel,
};

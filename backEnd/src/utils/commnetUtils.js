require("dotenv").config();

const url = `mongodb+srv://${process.env.id}:${process.env.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient; // mongoDB 가져오기

const dbName = process.env.dbName;
const colName = "comment";

function addComment(content, writer, isReply, commentFor) {
    commentNumAdd(true).then((e) => {
        MongoClient.connect(url, (err, client) => {
            if (err) console.log(err);
            const db = client.db(dbName);
            db.collection(colName).insertOne({
                _id: e,
                content,
                writer,
                commentFor,
                isReply,
            });
            return;
        });
    });
}

function modComment(id, content) {
    MongoClient.connect(url, (err, client) => {
        if (err) console.log(err);

        const db = client.db(dbName);
        db.collection(colName).updateOne(
            { _id: id },
            {
                $set: {
                    content: content,
                },
            }
        );
    });
}

function findByCommentId(id) {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            resolve(db.collection(colName).findOne({ _id: id }));
            return;
        });
    });
    return promise;
}

function deleteByCommentID(id) {
    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);
        db.collection(colName).deleteOne({ _id: id });
        commentNumDel();
        return;
    });
}

function commentNumAdd(isreturn) {
    const promise = new Promise((resolve) => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);

            db
                .collection("idController")
                .updateOne(
                    { _id: `${process.env.commentNumId}` },
                    { $inc: { num: 1, totalComment: 1 } }
                ),
                (err) => {
                    if (err) console.log(err);
                };
            if (isreturn)
                db.collection("idController").findOne(
                    {
                        _id: `${process.env.commentNumId}`,
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

function commentNumDel() {
    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);

        db
            .collection("idController")
            .updateOne(
                { _id: `${process.env.commentNumId}` },
                { $inc: { totalComment: -1 } }
            ),
            (err) => {
                if (err) console.log(err);
            };

        return;
    });
}

module.exports = {
    deleteByCommentID,
    modComment,
    addComment,
    findByCommentId,
};

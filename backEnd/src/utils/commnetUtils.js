require("dotenv").config();

const url = `mongodb+srv://${process.env.id}:${process.env.password}@apple.oaghb.mongodb.net/?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient; // mongoDB 가져오기

const dbName = process.env.dbName;
const colName = "comment";

function addComment(isReply, commentFor) {}

function findByCommentWriter(writer) {}

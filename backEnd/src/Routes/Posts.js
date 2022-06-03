const express = require("express");
const { saveOneData, findAll } = require("../utils/postUtils");

const router = express.Router();
const dbName = "todoapp";
const colName = "post";

router.get("/", (req, res) => {
    res.send("hello");
});

router.get("/list", (req, res) => {
    findAll(dbName, colName).then((e) => {
        res.json(e);
    });
});

module.exports = router;

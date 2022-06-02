const express = require("express");
const { saveOneData, findAll } = require("../utils/dbUtils");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.get("/list", (req, res) => {
    findAll(dbName, colName).then((e) => {
        res.json(e);
    });
});

module.exports = router;

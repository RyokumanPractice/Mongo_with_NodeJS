const { findById } = require("../utils/postUtils");
const express = require("express");

const router = express.Router();
const dbName = "todoapp";
const colName = "post";

router.get("/findid", (req, res) => {
    findById(dbName, colName, 1).then((e) => {
        res.send(e);
        console.log(e);
    });
});

module.exports = router;

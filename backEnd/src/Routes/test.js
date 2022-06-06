const { findById, test } = require("../utils/postUtils");
const express = require("express");

const router = express.Router();

router.get("/findid", (req, res) => {
    findById(1).then((e) => {
        res.send(e);
        console.log(e);
    });
});

router.get("/test", (req, res) => {
    test();
    res.send("test");
});

module.exports = router;

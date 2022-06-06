const express = require("express");
const { findAllPost } = require("../utils/postUtils");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.get("/list", (req, res) => {
    findAllPost().then((e) => {
        res.json(e);
    });
});

module.exports = router;

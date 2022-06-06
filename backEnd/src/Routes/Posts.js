const express = require("express");
const { saveOneData, findAll } = require("../utils/postUtils");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.get("/list", (req, res) => {
    findAll().then((e) => {
        res.json(e);
    });
});

module.exports = router;

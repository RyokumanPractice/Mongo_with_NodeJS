const { findByPostId, addPost } = require("../utils/postUtils");
const express = require("express");
const { sample } = require("../assets/img/sample");

const router = express.Router();

router.get("/findid", (req, res) => {
    findByPostId(1).then((e) => {
        res.send(e);
        console.log(e);
    });
});

router.get("/sample", (req, res) => {
    sample();
});

router.get("/", (req, res) => {
    addPost("hello", "몰라", "닉네임", "");
    res.send("test");
});

module.exports = router;

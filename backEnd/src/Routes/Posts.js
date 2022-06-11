const express = require("express");
const {
    findPost,
    findByPostId,
    deleteByPostId,
    addPost,
    modPost,
    postNumAdd,
    postNumDel,
} = require("../utils/postUtils");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.get("/list", (req, res) => {
    findAllPost().then((e) => {
        res.json(e);
    });
});

router.get("/add", (req, res) => {
    const title = req.query.title;
    const content = req.query.content;
    const writer = req.query.writer;
    const img = req.query.img;

    addPost(title, content, writer, img);
    res.send("test");
});

module.exports = router;

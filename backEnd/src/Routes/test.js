const { deleteByCommentID } = require("../utils/commnetUtils");
const express = require("express");

const router = express.Router();

router.get("/comment", (req, res) => {
    deleteByCommentID(1);
    res.send("added");
});

router.get("/user", (req, res) => {
    addUser("ryokuman3", "1234", "료쿠지", "");
    res.send("adduser");
});

module.exports = router;

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

router.get("/artists", function (req, res) {
    console.log("이름은 " + req.query.name + " 입니다");
    res.send("name : " + req.query.name);
});

router.get("/test", (req, res) => {
    console.log("입력값은" + req.query.value);
    res.send("입력값 : " + req.query.value);
});

module.exports = router;

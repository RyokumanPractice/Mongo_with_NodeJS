const { deleteByCommentID } = require("../utils/commnetUtils");
const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
    res.send({ name: "hello buddy", age: 15 });
});

module.exports = router;

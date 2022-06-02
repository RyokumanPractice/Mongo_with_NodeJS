const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const dbName = "todoapp";
const colName = "post";
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/post", require("./src/Routes/Posts"));

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

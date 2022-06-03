const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/post", require("./Routes/Posts"));
app.use("/test", require("./Routes/test"));

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

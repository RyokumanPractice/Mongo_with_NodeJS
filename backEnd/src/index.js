const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;
const whitelist = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not Allowed Origin!"));
        }
    },
};

app.use(cors(corsOptions));

app.use("/post", require("./Routes/Posts"));
app.use("/test", require("./Routes/test"));

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

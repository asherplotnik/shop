const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

const port = process.env.PORT || 8081;
app.listen(port);

console.log("App is listening on port " + port);

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();

const createGist = require("./routes/createGist");
const generateUrls = require("./routes/generateUrls");
const batchScores = require("./routes/batchScores");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.use(createGist);
app.use(generateUrls);
app.use(batchScores);

app.listen(3000, () => {
  console.log("App running on http://localhost:3000");
});

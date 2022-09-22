const express = require("express");
const router = express.Router();
const fs = require("fs");

// Insert urls here
const list = ["https://www.bbc.com/scotland"];

router.get("/api/generate-urls", async (req, res) => {
  const urls = list.map((url) => url.replace(/\/$/, ""));
  fs.writeFileSync("./urls.txt", urls.join("\n"));

  setTimeout(() => {
    if (!fs.existsSync("./urls.txt")) {
      res.status(200).send({ msg: "Something went wrong" });
    }
    res.status(200).send({ msg: "OK", urls });
  }, 500);
});

module.exports = router;

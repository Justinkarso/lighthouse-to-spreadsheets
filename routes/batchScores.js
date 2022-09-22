const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const fs = require("fs");

router.get("/api/batch-scores", async (req, res) => {
  exec(
    "lighthouse-batch -f ./urls.txt -o ./lighthouse",
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      if (stderr) {
        console.log(stderr);
      }
      if (stdout) {
        console.log("\x1b[32m%s\x1b[0m", stdout);
        console.log("\x1b[36m%s\x1b[0m", "Audit complete!");

        const files = fs.readdirSync("./lighthouse");
        res.status(200).json({ msg: "OK", files });
      }
    }
  );
});

module.exports = router;

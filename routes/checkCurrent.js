const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/api/check-current", async (req, res) => {
  const files = fs.readdirSync("./lighthouse");
  if (files.length > 1) {
    res.status(200).json({ msg: "OK", files });
  } else {
    res.status(200).json({ msg: "NO" });
  }
});

module.exports = router;

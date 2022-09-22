const express = require("express");
const router = express.Router();
const fs = require("fs");
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

router.get("/api/create-gists", async (req, res) => {
  const files = await fs
    .readdirSync("./lighthouse")
    .filter((file) => file !== "summary.json")
    .filter((file) => file !== ".gitignore");

  let gists = [];

  for (const file of files) {
    const content = await fs.readFileSync(`./lighthouse/${file}`, "utf8");
    const gist = await octokit.request("POST /gists", {
      description: "Lighthouse report",
      public: false,
      files: {
        [file]: {
          content: content,
        },
      },
    });
    gists.push(
      `https://googlechrome.github.io/lighthouse/viewer/?gist=${gist.data.id}`
    );
  }

  const summary = await fs.readFileSync("./lighthouse/summary.json", "utf8");
  const parsedSummary = JSON.parse(summary);
  parsedSummary.forEach((item, index) => {
    item.lighthouse = gists[index];
  });

  await fs.writeFileSync(
    "./lighthouse/summary.json",
    JSON.stringify(parsedSummary, null, 2)
  );

  const summaryGist = await octokit.request("POST /gists", {
    description: "Lighthouse report - summary",
    public: false,
    files: {
      "summary.json": {
        content: JSON.stringify(parsedSummary, null, 2),
      },
    },
  });

  if (!summaryGist.data.id) {
    res.status(200).send("Something went wrong");
  }

  // get github username from auth token
  const user = await octokit.request("GET /user");
  const username = user.data.login;
  const githubGistUrl = `https://gist.github.com/${username}`;

  res.status(200).json({ msg: "OK", parsedSummary, githubGistUrl });
});

module.exports = router;

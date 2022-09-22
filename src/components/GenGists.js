import React from "react";
import axios from "axios";

const GenGists = ({ handleStep }) => {
  const [text, setText] = React.useState("Generate Gists");
  const [helperText, setHelperText] = React.useState("");

  const handleGists = () => {
    setText("Generating...");
    setHelperText(
      `⏳ Please wait while I generate the gists. This may take a few minutes. ⏳`
    );
    axios.get("/api/create-gists").then((res) => {
      let arr = [];
      if (res.data.msg === "OK") {
        setText("Generated Gists!");
        res.data.parsedSummary.forEach((item) => {
          arr.push(item.lighthouse);
        });
        handleStep(arr, res.data.githubGistUrl);
        setHelperText("");
      }
    });
  };

  return (
    <>
      <button
        onClick={handleGists}
        className="bg-amber-500 py-2 px-4 rounded-md mt-4 font-bold"
      >
        {text}
      </button>
      <p className="text-sm text-center text-gray-400 mt-2 break-words">
        {helperText}
      </p>
    </>
  );
};

export default GenGists;

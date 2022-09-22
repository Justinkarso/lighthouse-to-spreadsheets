import React from "react";
import axios from "axios";

const BatchScores = ({ handleStep }) => {
  const [text, setText] = React.useState("Batch Scores");
  const [helperText, setHelperText] = React.useState("");

  const BatchScores = () => {
    setText("Generating...");
    setHelperText(
      `⏳ Please wait while I generate the scores. This may take a few minutes. You should check your folder for the generated files. ⏳`
    );
    axios.get("/api/batch-scores").then((res) => {
      if (res.data.msg === "OK") {
        setText("Batched!");
        handleStep(res.data.files);
      }
    });
  };

  return (
    <>
      <button
        onClick={BatchScores}
        className="bg-indigo-500 py-2 px-4 rounded-md mt-4 font-bold"
      >
        {text}
      </button>
      <p className="text-sm text-center text-gray-400 mt-2">{helperText}</p>
    </>
  );
};

export default BatchScores;

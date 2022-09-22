import React from "react";
import axios from "axios";

const GenUrls = ({ handleStep }) => {
  const [text, setText] = React.useState("Generate URLS");

  const handleUrls = () => {
    setText("Generating...");
    axios.get("/api/generate-urls").then((res) => {
      if (res.data.msg === "OK") {
        setText("Generated!");
        handleStep(res.data.urls);
      }
    });
  };

  return (
    <button
      onClick={handleUrls}
      className="bg-emerald-500 py-2 px-4 rounded-md mt-4 font-bold"
    >
      {text}
    </button>
  );
};

export default GenUrls;

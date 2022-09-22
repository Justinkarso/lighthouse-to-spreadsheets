import React from "react";
import BatchScores from "../components/BatchScores";
import GenGists from "../components/GenGists";
import GenUrls from "../components/GenUrls";

export default function Home() {
  const [step, setStep] = React.useState(0);
  const [files, setFiles] = React.useState([]);
  const [url, setUrl] = React.useState("");

  const handleStep = (files, url) => {
    setStep(step + 1);
    if (files) {
      setFiles(files);
    }
    if (url) {
      console.log(url);
      setUrl(url);
    }
  };

  const handleStartOver = () => {
    setStep(0);
    setFiles([]);
    setUrl("");
  };

  return (
    <main className="container mx-auto max-w-[1100px] min-h-[100vh] flex items-center justify-center">
      <div className="flex flex-col bg-[#111] p-8 rounded-md min-w-[300px] break-words">
        <h1 className="font-bold">Lighthouse Batcher</h1>
        {files.length > 0 && (
          <div className="flex flex-col bg-[#222] p-4 py-2 rounded-md mt-2 break-words">
            <h2 className="text-emerald-500 font-bold">Generated:</h2>
            {files.map((file, index) => (
              <p key={index} className="mr-2 break-words">
                - {file}
              </p>
            ))}
          </div>
        )}
        {step === 0 && <GenUrls handleStep={handleStep} />}
        {step === 1 && <BatchScores handleStep={handleStep} />}
        {step === 2 && <GenGists handleStep={handleStep} />}
        {step === 3 && (
          <button
            onClick={handleStartOver}
            className="bg-rose-500 py-2 px-4 rounded-md mt-4 font-bold"
          >
            Start Over
          </button>
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-teal-500 py-2 px-4 rounded-md mt-4 font-bold flex items-center justify-center"
          >
            View My Gists
          </a>
        )}
      </div>
    </main>
  );
}

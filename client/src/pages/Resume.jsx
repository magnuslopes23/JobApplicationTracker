import React, { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import ResumeResult from "../components/ResumeResults";

const Resume = () => {
  const [aiOutput, setAiOutput] = useState(null);

  return (
    <div className="flex">
      <main className="w-full min-h-screen bg-gray-50">
        {!aiOutput ? (
          <ResumeUpload onSuccess={setAiOutput} />
        ) : (
          <ResumeResult output={aiOutput} />
        )}
      </main>
    </div>
  );
};

export default Resume;

import React from "react";
import ReactMarkdown from "react-markdown";
import { exportToWord } from "../utils/exportToWord";

const ResumeResult = ({ output, onBack }) => {
  if (!output) return null;

  return (
    <div className="max-w-5xl mx-auto mt-6 relative">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white py-4 px-6 border-b border-gray-200 flex items-center justify-between rounded-t-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">📄 Resume Preview</h2>
        <div className="flex gap-3">
          <button
            onClick={() => exportToWord(output)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm transition"
          >
            Export to Word
          </button>
          <button
            onClick={onBack}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm transition"
          >
            ← Back to Upload
          </button>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="bg-white shadow-xl rounded-b-xl p-6 prose max-w-none">
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ResumeResult;

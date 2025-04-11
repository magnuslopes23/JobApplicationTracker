import React, { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";
import API from "../services/Api";
import Loader from "../components/Loader";




const ResumeUpload = ({ onSuccess }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setResumeFile(file);
    } else {
      alert("File must be under 5MB.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription.trim()) {
      alert("Please upload a resume and paste the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jd", jobDescription);

    setLoading(true);
    try {
      const res = await API.post("/gpt/optimize-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data.output);
      onSuccess(res.data.output)
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
    <Loader show={loading} message="Tailoring your resume..." />

      <main className="w-full min-h-screen bg-gray-50 pl-8 pr-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          🎯 Resume Tailoring
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-6 space-y-6 max-w-4xl mx-auto"
        >
          <div
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-purple-500 transition"
          >
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            {!resumeFile ? (
              <>
                <p className="font-medium text-gray-700">
                  Drag your resume here or{" "}
                  <span className="text-purple-600 underline">
                    click to upload
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Acceptable file types: DOC, DOCX (5MB max)
                </p>
              </>
            ) : (
              <div className="text-center">
                <p className="text-green-600 font-semibold">
                  ✅ Selected: {resumeFile.name}
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-1 border border-purple-500 text-purple-600 rounded-md text-sm hover:bg-purple-50 transition"
                  >
                    Change File
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeFile(null)}
                    className="px-4 py-1 border border-red-500 text-red-600 rounded-md text-sm hover:bg-red-50 transition"
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Paste Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows="8"
              className="w-full border border-gray-300 rounded p-3 text-sm resize-none"
              placeholder="Paste the job description here..."
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
              {loading ? "Tailoring..." : "Tailor My Resume"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ResumeUpload;

import React, { useEffect, useState } from "react";
import JobList from "../components/JobList";
import AddJobForm from "../components/AddJobForm";
import API from "../services/Api";
import { PlusCircle } from "lucide-react";
import { showToast, showToastPromise } from "../utils/toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      showToast("error", "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmitJob = async (jobData, isEditing) => {
    const promise = new Promise((resolve, reject) => {
      try {
        if (isEditing) {
          setJobs((prev) =>
            prev.map((j) => (j._id === jobData._id ? jobData : j))
          );
        } else {
          setJobs((prev) => [...prev, jobData]);
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    showToastPromise(promise, {
      loading: isEditing ? "Updating job..." : "Adding job...",
      success: isEditing ? "Job updated successfully!" : "Job added successfully!",
      error: isEditing ? "Failed to update job" : "Failed to add job",
    });

    try {
      await promise;
      setJobToEdit(null);
      setShowModal(false);
    } catch (err) {
      console.error("Job submit error:", err);
    }
  };

  const handleDeleteJob = async (id) => {
    const promise = API.delete(`/jobs/${id}`);

    showToastPromise(promise, {
      loading: "Deleting job...",
      success: "Job deleted successfully!",
      error: "Failed to delete job",
    });

    try {
      await promise;
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error("Delete Job Error:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🧾 Job Applications</h1>
        <button
          onClick={() => {
            setJobToEdit(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          <PlusCircle size={18} /> Add Job
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading jobs...</p>
      ) : (
        <JobList
          jobs={jobs}
          onDelete={handleDeleteJob}
          onEdit={(job) => {
            setJobToEdit(job);
            setShowModal(true);
          }}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative animate-slide-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
            >
              &times;
            </button>
            <AddJobForm
              isEditing={!!jobToEdit}
              initialData={jobToEdit}
              onSubmit={handleSubmitJob}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import InterviewCalendar from "../components/InterviewCalendar";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [statsHeight, setStatsHeight] = useState(0);
  const statsRef = useRef(null);

  const stats = [
    { label: "Applied", value: 0, color: "bg-indigo-100 text-indigo-800" },
    { label: "Interviewed", value: 0, color: "bg-yellow-100 text-yellow-800" },
    { label: "Rejected", value: 0, color: "bg-red-100 text-red-800" },
    { label: "Accepted", value: 0, color: "bg-green-100 text-green-800" },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (statsRef.current) {
      setStatsHeight(statsRef.current.offsetHeight);
    }
  }, [jobs]);

  const statusCount = (status) => jobs.filter((j) => j.status === status).length;

  return (
    <div className="flex">
      <main className="w-full min-h-screen bg-gray-50 pl-8 pr-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome back, {user?.name} 👋
        </h1>

        <div className="flex flex-col md:flex-row gap-6 mb-10 items-start">
          <div ref={statsRef} className="md:w-1/2 w-full grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-lg shadow-sm hover:shadow-md transition p-6 ${stat.color}`}
              >
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{statusCount(stat.label)}</p>
              </div>
            ))}
          </div>

          <div className="md:w-1/2 w-full self-stretch">
            <InterviewCalendar height={statsHeight} />
          </div>
        </div>

        <div className="w-full bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Applications
            </h2>
            <button
              onClick={() => navigate("/jobs")}
              className="text-sm text-purple-600 hover:underline"
            >
              View All
            </button>
          </div>

          {jobs.length === 0 ? (
            <p className="text-gray-500">Job list will appear here...</p>
          ) : (
            <ul className="divide-y">
              {jobs.slice(0, 3).map((job) => (
                <li key={job._id} className="py-2">
                  <p className="font-medium text-gray-700">{job.role} at {job.company}</p>
                  <p className="text-sm text-gray-500">Status: {job.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

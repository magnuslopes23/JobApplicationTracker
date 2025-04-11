import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, onDelete, onEdit }) => {
  if (jobs.length === 0) {
    return <p className="text-gray-500">No jobs added yet...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default JobList;

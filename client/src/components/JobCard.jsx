import React from "react";
import { Trash2, Pencil } from "lucide-react";

const JobCard = ({ job, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-purple-700">{job.role}</h3>
          <p className=" font-bold text-sm text-gray-600">{job.company}</p>
          <p className="text-xs text-gray-500">Status: {job.status}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(job)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(job._id)}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="font-bold text-xs text-gray-500">Job Description</p>
      <div className="text-sm text-gray-700 max-h-40 overflow-y-auto">
        
        <p className="whitespace-pre-wrap">{job.jd}</p>
      </div>
    </div>
  );
};

export default JobCard;

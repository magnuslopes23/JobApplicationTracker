import React, { useRef, useEffect, useState } from "react";
import API from "../services/Api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  company: yup.string().required("Company is required"),
  role: yup.string().required("Role is required"),
  jd: yup.string().required("Job description is required"),
  status: yup.string().required("Status is required"),
});

const AddJobForm = ({ onSubmit, isEditing = false, initialData = {}, onClose }) => {
  const fileInputRef = useRef();
  const [resumeFile, setResumeFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company: initialData?.company || "",
      role: initialData?.role || "",
      jd: initialData?.jd || "",
      status: initialData?.status || "Applied",
    },
  });
  

  useEffect(() => {
    if (isEditing && initialData) {
      setValue("company", initialData.company || "");
      setValue("role", initialData.role || "");
      setValue("jd", initialData.jd || "");
      setValue("status", initialData.status || "Applied");
    }
  }, [isEditing, initialData, setValue]);

  const handleResumeChange = (e) => {
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

  const onFormSubmit = async (data) => {
    if (!isEditing && !resumeFile) {
      alert("Please upload a resume.");
      return;
    }

    try {
      let res;
      if (isEditing && initialData._id) {
        res = await API.put(`/jobs/${initialData._id}`, data);
      } else {
        const formData = new FormData();
        formData.append("company", data.company);
        formData.append("role", data.role);
        formData.append("jd", data.jd);
        formData.append("status", data.status);
        formData.append("resume", resumeFile);

        res = await API.post("/jobs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSubmit(res.data, isEditing);
      onClose();
    } catch (err) {
      console.error("Job submit error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            {...register("company")}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            {...register("role")}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Job Description</label>
        <textarea
          {...register("jd")}
          rows="4"
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
        />
        {errors.jd && <p className="text-red-500 text-sm mt-1">{errors.jd.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register("status")}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        {!isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
            <div
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="mt-1 border-dashed border-2 border-gray-300 rounded-md text-sm p-2 text-center cursor-pointer hover:border-purple-500 transition"
            >
              {resumeFile ? (
                <div className="flex items-center justify-between">
                  <p className="truncate max-w-[85%] text-green-600 font-medium">{resumeFile.name}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = null;
                    }}
                    className="text-red-500 text-sm"
                  >
                    ❌
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">Click to upload (.doc, .docx)</p>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".doc,.docx"
              onChange={handleResumeChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          {isEditing ? "Update Job" : "Add Job"}
        </button>
      </div>
    </form>
  );
};

export default AddJobForm;

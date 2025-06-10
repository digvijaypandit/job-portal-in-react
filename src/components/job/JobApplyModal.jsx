import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import { HiUpload } from "react-icons/hi";

Modal.setAppElement("#root");

const JobApplyModal = ({ isOpen, onRequestClose, jobId }) => {
  const [useProfileResume, setUseProfileResume] = useState(true);
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_BASE_URL;
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleOptionChange = (e) => {
    const useProfile = e.target.value === "profile";
    setUseProfileResume(useProfile);
    if (useProfile) {
      setResume(null); // clear file if switching to profile resume
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If uploading new resume, ensure file is selected
    if (!useProfileResume && !resume) {
      toast.error("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    if (!useProfileResume && resume) {
      formData.append("resume", resume);
    }

    try {
      setIsSubmitting(true);
      await axios.post(
        `${API_URL}/application/jobs/${jobId}/apply`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Application submitted successfully!");
      onRequestClose();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to apply. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Apply to Job"
      className="relative w-full max-w-lg mx-auto mt-24 bg-white rounded-xl shadow-xl p-8 transition-all"
      overlayClassName="fixed inset-0 bg-transparent backdrop-blur-[2px]  bg-opacity-40 flex justify-center items-center z-50"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Submit Your Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="inline-flex items-center mr-6">
            <input
              type="radio"
              value="profile"
              checked={useProfileResume}
              onChange={handleOptionChange}
              className="form-radio"
            />
            <span className="ml-2">Use profile resume</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="upload"
              checked={!useProfileResume}
              onChange={handleOptionChange}
              className="form-radio"
            />
            <span className="ml-2">Upload new resume</span>
          </label>
        </div>

        {!useProfileResume && (
          <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:border-blue-500 transition">
            <label htmlFor="resume" className="cursor-pointer block">
              <HiUpload className="mx-auto text-3xl text-blue-600 mb-2" />
              <span className="text-blue-600 font-medium">
                {resume ? "Change Resume" : "Click to Upload Resume"}
              </span>
              <p className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX</p>
            </label>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            {resume && (
              <p className="mt-4 text-sm text-gray-700 font-medium">
                Selected: {resume.name}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2 rounded-md text-white transition ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Apply Now"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default JobApplyModal;

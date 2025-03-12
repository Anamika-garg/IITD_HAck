import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaUpload } from "react-icons/fa";

const Resume = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-4xl font-bold text-center mb-8">AI-Powered Resume Tools</h2>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        
        {/* Generate Resume Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg border hover:shadow-2xl transition duration-300 cursor-pointer text-center"
          onClick={() => navigate("/generateResume")}
        >
          <FaFileAlt className="text-blue-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Generate Your Resume</h3>
          <p className="text-gray-600 mt-2">Create a professional resume with AI assistance.</p>
        </div>

        {/* Resume Review Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg border hover:shadow-2xl transition duration-300 cursor-pointer text-center"
          onClick={() => navigate("/resumereview")}
        >
          <FaUpload className="text-green-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Get Your Resume Reviewed</h3>
          <p className="text-gray-600 mt-2">Upload your resume and get AI-powered feedback.</p>
        </div>

      </div>
    </div>
  );
};

export default Resume;

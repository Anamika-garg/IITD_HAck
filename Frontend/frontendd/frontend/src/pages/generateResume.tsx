import React, { useState } from "react";
import axios from "axios";

const ResumeGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [resume, setResume] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate_resume", formData);
      console.log(response.data);
      setResume(response.data.resume);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">AI-Powered Resume Generator</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Skills</label>
          <textarea
            name="skills"
            placeholder="List your skills..."
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Experience</label>
          <textarea
            name="experience"
            placeholder="Enter your experience..."
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Education</label>
          <textarea
            name="education"
            placeholder="Enter your education details..."
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          onClick={generateResume}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Generate Resume
        </button>
      </div>

      {resume && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Generated Resume</h3>
          <pre className="text-sm text-gray-800">{resume}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;

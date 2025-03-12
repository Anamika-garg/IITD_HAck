import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLightbulb, FaUserGraduate } from "react-icons/fa";

const Resume = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-4xl font-bold text-center mb-8">AI-Powered Career Tools</h2>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        
        {/* Skill Quiz Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg border hover:shadow-2xl transition duration-300 cursor-pointer text-center"
          onClick={() => navigate("/skillrating")}
        >
          <FaLightbulb className="text-yellow-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Take a Skill Quiz</h3>
          <p className="text-gray-600 mt-2">Test your skills and get AI-powered insights.</p>
        </div>

        {/* Career Guidance Card */}
        <div
          className="p-6 bg-white shadow-lg rounded-lg border hover:shadow-2xl transition duration-300 cursor-pointer text-center"
          onClick={() => navigate("/careerguidance")}
        >
          <FaUserGraduate className="text-blue-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Career Guidance</h3>
          <p className="text-gray-600 mt-2">Get personalized career advice with AI insights.</p>
        </div>
      </div>
    </div>
  );
};

export default Resume;

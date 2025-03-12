import React, { useState } from "react";
import Button from "../button";

const skills = [
  "Database Fundamentals",
  "Computer Architecture",
  "Distributed Computing Systems",
  "Cyber Security",
  "Networking",
  "Software Development",
  "Programming Skills",
  "Project Management",
  "Computer Forensics Fundamentals",
  "Technical Communication",
  "AI ML",
  "Software Engineering",
  "Business Analysis",
  "Communication skills",
  "Data Science",
  "Troubleshooting skills",
  "Graphics Designing",
];

const levels = ["Beginner", "Poor", "Average", "Intermediate", "Excellent", "Professional", "Not Interested"];

export default function SkillQuiz() {
  const [ratings, setRatings] = useState<{ [key: string]: string }>({});
  const [predictedRole, setPredictedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelection = (skill: string, level: string) => {
    setRatings((prev) => ({ ...prev, [skill]: level }));
  };

  const handleSubmit = async () => {
    if (Object.keys(ratings).length !== skills.length) {
      alert("Please rate all skills before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: ratings }),
      });

      const data = await response.json();
      console.log(data);
      setPredictedRole(data.predicted_role);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get a prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6 mt-14">Skill Quiz</h2>

      {/* ✅ Show predicted role at the top */}
      {predictedRole && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-800">
            Best IT Role for You: {predictedRole}
          </h3>
        </div>
      )}

      {skills.map((skill, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">{skill}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => handleSelection(skill, level)}
                className={`p-2 border rounded-md ${
                  ratings[skill] === level ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-6">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Predicting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

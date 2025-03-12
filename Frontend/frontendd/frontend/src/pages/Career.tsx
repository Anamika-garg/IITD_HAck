import React, { useState } from "react";

const CareerPage = () => {
  const [activeTab, setActiveTab] = useState("skillQuiz");

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("skillQuiz")} style={{ padding: "10px 20px", cursor: "pointer", border: activeTab === "skillQuiz" ? "2px solid #007bff" : "1px solid #ccc" }}>
          Skill Quiz
        </button>
        <button onClick={() => setActiveTab("careerGuidance")} style={{ padding: "10px 20px", cursor: "pointer", border: activeTab === "careerGuidance" ? "2px solid #007bff" : "1px solid #ccc" }}>
          Career Guidance
        </button>
      </div>
      
      {/* Content */}
      {activeTab === "skillQuiz" && <h2>Skill Quiz - Choose Your IT Role</h2>}
      {activeTab === "careerGuidance" && <h2>Career Guidance</h2>}
    </div>
  );
};

export default CareerPage;
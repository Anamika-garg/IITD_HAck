import React from "react";

const dummyData = {
  Resume_Strengths: ["Strong technical skills", "Good project experience"],
  Resume_Weaknesses: ["Lack of leadership experience", "No certifications listed"],
  Job_Alignment: "Your resume aligns well with software development roles but could improve in leadership and certifications.",
  Career_Opportunities: ["Software Developer", "Full Stack Developer", "Backend Engineer"],
  Improvement_Areas: ["Get leadership experience", "Earn relevant certifications"],
  Roadmap: {
    Short_Term_Goals: ["Complete a leadership workshop", "Enroll in an online certification"],
    Long_Term_Goals: ["Gain mentorship experience", "Contribute to open-source projects"],
    Recommended_Courses: ["AWS Certified Developer", "Advanced React"],
    Networking_Strategies: ["Attend tech meetups", "Engage in LinkedIn discussions"],
  },
};

export default function ResumeReviewResults() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Resume Review Results
      </h2>

      <div className="space-y-6">
        <Section title="Resume Strengths" items={dummyData.Resume_Strengths} />
        <Section title="Resume Weaknesses" items={dummyData.Resume_Weaknesses} />
        <Section title="Job Alignment" text={dummyData.Job_Alignment} />
        <Section title="Career Opportunities" items={dummyData.Career_Opportunities} />
        <Section title="Improvement Areas" items={dummyData.Improvement_Areas} />

        <div className="p-4 border rounded-md bg-gray-100">
          <h4 className="font-semibold text-lg text-purple-600">Career Roadmap</h4>
          <Section title="Short-Term Goals" items={dummyData.Roadmap.Short_Term_Goals} />
          <Section title="Long-Term Goals" items={dummyData.Roadmap.Long_Term_Goals} />
          <Section title="Recommended Courses" items={dummyData.Roadmap.Recommended_Courses} />
          <Section title="Networking Strategies" items={dummyData.Roadmap.Networking_Strategies} />
        </div>
      </div>
    </div>
  );
}

// Helper component for sections
function Section({ title, items, text }: { title: string; items?: string[]; text?: string }) {
  if (!items?.length && !text) return null;

  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-semibold text-purple-600">{title}</h4>
      {text ? (
        <p className="text-gray-700">{text}</p>
      ) : (
        <ul className="list-disc list-inside text-gray-700">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";

const CareerGuidance = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const getAdvice = async () => {
    if (!prompt.trim()) {
      setResponse("Please enter a prompt before submitting.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post(" http://127.0.0.1:5000/get_career_advice", { prompt });
      console.log(res)
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setResponse("Error fetching advice. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "20px", textAlign: "center" }}>
      <h2 className="mt-6">AI-Powered Career Guidance</h2>
      <textarea 
        placeholder="Write your career-related query..." 
        value={prompt} 
        onChange={handleChange} 
        rows={5}
        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      ></textarea>
      <br />
      <button 
        onClick={getAdvice} 
        style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}
        disabled={loading}
      >
        {loading ? "Generating..." : "Get Advice"}
      </button>
      {response && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <h3>AI Response</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;
from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load the trained model
model = joblib.load("skill_prediction_model.pkl")

# Define the skills
skill_features = [
    "Database Fundamentals", "Computer Architecture", "Distributed Computing Systems", "Cyber Security",
    "Networking", "Software Development", "Programming Skills", "Project Management",
    "Computer Forensics Fundamentals", "Technical Communication", "AI ML", "Software Engineering",
    "Business Analysis", "Communication skills", "Data Science", "Troubleshooting skills", "Graphics Designing"
]

# Skill level mapping
skill_mapping = {
    "Not Interested": 4, "Poor": 5, "Beginner": 1, "Average": 0,
    "Intermediate": 3, "Excellent": 2, "Professional": 6
}

# IT Role mapping (Modify this to match your dataset's encoding)
it_role_mapping = {
    3: "Database Administrator", 6: "Hardware Engineer", 
    0: "Application Support Engineer", 2: "Cyber Security Specialist", 
    9: "Networking Engineer", 14: "Software Developer", 
    1: "API Specialist", 11: "Project Manager", 
    7: "Information Security Specialist", 16: "Technical Writer", 
    15: "AI ML Specialist", 13: "Software Tester", 
    4: "Business Analyst", 5: "Customer Service Executive", 
    8: "Data Scientist", 10: "Helpdesk Engineer", 
    12: "Graphics Designer"
}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Receive JSON data from frontend
        skill_levels = data.get("skills", {})  # Extract skill ratings

        # Convert skill levels to numerical values
        input_values = [skill_mapping.get(skill_levels.get(skill, "Not Interested"), 0) for skill in skill_features]

        # Convert to DataFrame for model prediction
        input_df = pd.DataFrame([input_values], columns=skill_features)

        # Make prediction (numerical value)
        predicted_role_num = model.predict(input_df)[0]

        # Map numerical value to actual role name
        predicted_role = it_role_mapping.get(predicted_role_num, "Unknown Role")

        return jsonify({"predicted_role": predicted_role})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
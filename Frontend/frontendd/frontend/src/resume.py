from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Set up Gemini API
GENAI_API_KEY = "your_google_gemini_api_key_here"
genai.configure(api_key="AIzaSyAImUuxo1t3jipw2IF0AY5FB5-N4y8enzg")

@app.route("/generate_resume", methods=["POST"])
def generate_resume():
    data = request.json
    user_prompt = f"Generate a professional resume for:\n\nName: {data['name']}\nEmail: {data['email']}\nPhone: {data['phone']}\nSkills: {data['skills']}\nExperience: {data['experience']}\nEducation: {data['education']}"

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(user_prompt)
        return jsonify({"resume": response.text})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
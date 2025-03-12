from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Set up Gemini API
GENAI_API_KEY = "AIzaSyAImUuxo1t3jipw2IF0AY5FB5-N4y8enzg"
genai.configure(api_key=GENAI_API_KEY)

@app.route("/get_career_advice", methods=["POST"])
def get_career_advice():
    data = request.json
    user_prompt = data.get("prompt", "")
    
    if not user_prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    try:
        model = genai.GenerativeModel("google/flan-t5")
        response = model.generate_content(user_prompt)
        
        # Properly extracting response content
        ai_response = response.candidates[0].content if response.candidates else "No response generated."
        
        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

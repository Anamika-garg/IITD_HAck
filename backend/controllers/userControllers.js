const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai/index.mjs");
const axios = require("axios");
const { model, default: mongoose } = require("mongoose");
const language = require("@google-cloud/language");
const Journal = require("../models/Journal");

async function resumereview(req, res, next) {
  try {
    const { text } = req.body; // Extract resume text from frontend input
    const apiKey = process.env.GEMINI_API;

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    let formattedText = text
      .replace(
        /(Education|Work History|Experience|Professional Experience|Internships)/gi,
        "\n\n[Experience]\n"
      )
      .replace(
        /(Education|Academic Background|Academic Qualifications|EDUCATION)/gi,
        "\n\n[Education]\n"
      )
      .replace(
        /(Skills|Technical Skills|Core Competencies|Areas of Expertise)/gi,
        "\n\n[Skills]\n"
      )
      .replace(
        /(Projects|Personal Projects|PROJECTS|Portfolio)/gi,
        "\n\n[Projects]\n"
      )
      .replace(
        /(Certifications|Licenses|CERTIFICATIONS|Courses|Accreditations)/gi,
        "\n\n[Certifications]\n"
      )
      .replace(/(Awards|Honors|Achievements|Recognitions)/gi, "\n\n[Awards]\n")
      .replace(
        /(Volunteer Work|Volunteering|Community Service)/gi,
        "\n\n[Volunteer Work]\n"
      )
      .replace(/(Publications|Research|Papers)/gi, "\n\n[Publications]\n")
      .replace(/(Languages|Language Proficiency)/gi, "\n\n[Languages]\n")
      .replace(/(References|Referees)/gi, "\n\n[References]\n");

    console.log(formattedText);

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `
                You are provided with text extracted from a resume. Analyze it and provide a structured career analysis including:

                ### Career Evaluation:
                1. Strengths & Weaknesses in Resume
                2. Industry Alignment & Job Readiness
                3. Missing Skills & Areas for Improvement
                4. Potential Career Paths Based on Resume
                5. Personalized Roadmap for Skill Development

                ### Output Structure:
                {
                  "Resume_Strengths": ["Key strengths found in the resume"],
                  "Resume_Weaknesses": ["Missing or weak areas in the resume"],
                  "Job_Alignment": "How well does the resume match industry expectations?",
                  "Career_Opportunities": ["Possible job roles or career paths based on the resume"],
                  "Improvement_Areas": ["Skills, projects, or certifications to focus on"],
                  "Roadmap": {
                    "Short_Term_Goals": ["Actions to improve in 3-6 months"],
                    "Long_Term_Goals": ["Steps to take over 1-3 years for career growth"],
                    "Recommended_Courses": ["Relevant online courses or certifications"],
                    "Networking_Strategies": ["How to connect with industry professionals"]
                  }
                }
                
                Here is the resume text:
                ${formattedText}
              `,
            },
          ],
        },
      ],
    };

    const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestData, {
      headers: { "Content-Type": "application/json" },
    });

    const analysis = response.data.candidates[0].content.parts[0].text;
    console.log("Career Analysis:", analysis);

    return res.json({ analysis });
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Failed to process the resume.");
  }
}

async function getCourses(req, res, next) {
  try {
    const { course } = req.body;
    const response = await axios.get(
      `https://api.coursera.org/api/courses.v1?q=search&query=${course}`
    );
    const courses = response.data.elements;

    // return res.send(courses);
    const coursesWithLinks = courses.map((course) => ({
      ...course,
      link: `https://www.coursera.org/learn/${course.slug}`,
    }));
    return res.status(200).json({
      success: "success",
      courses: coursesWithLinks,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

async function personalisedCourses(req, res, next) {
  try {
    const user = req.user;
    const currentUser = await User.findById(user.id);
    const response = await axios.get(
      `https://api.coursera.org/api/courses.v1?q=search&query=${
        currentUser.details?.profession || `Web Development`
      }`
    );
    const courses = response.data.elements;

    // return res.send(courses);
    const coursesWithLinks = courses.map((course) => ({
      ...course,
      link: `https://www.coursera.org/learn/${course.slug}`,
    }));
    return res.status(200).json({
      success: "success",
      courses: coursesWithLinks,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

async function careerRoadmap(req, res, next) {
  try {
    const { career } = req.body; 
    const apiKey = process.env.GEMINI_API;

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `
                You are an AI career guide. Provide a detailed roadmap for becoming a professional in the given career field: ${career}.
                
                ### Roadmap Structure:
                {
                  "Career_Overview": "Brief introduction about ${career}",
                  "Required_Skills": ["List of fundamental and advanced skills needed"],
                  "Technologies": ["Essential tools, frameworks, and software used"],
                  "Learning_Plan": {
                    "Beginner": ["Key concepts to learn in the first 3-6 months"],
                    "Intermediate": ["Projects and deeper topics for 6-12 months"],
                    "Advanced": ["Expert-level knowledge after 1-2 years"]
                  },
                  "Estimated_Timeframe": "Approximate time needed to become proficient",
                  "Recommended_Courses": ["Best online resources and certifications"],
                  "Networking_Strategies": ["How to connect with industry experts"],
                  "Job_Opportunities": ["Types of roles available after mastering ${career}"]
                }
              `,
            },
          ],
        },
      ],
    };

    const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestData, {
      headers: { "Content-Type": "application/json" },
    });

    const roadmap = response.data.candidates[0].content.parts[0].text;
    console.log("Career Roadmap:", roadmap);

    return res.json({ roadmap });
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Failed to generate career roadmap.");
  }
}


module.exports = {
  resumereview,
  getCourses,
  personalisedCourses,
  careerRoadmap
};

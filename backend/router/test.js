const { Router } = require("express");
const Test = require("../models/testModel.js");
const generateSkillAssessmentQuestions = require("../utils/generateSkillAssessmentQuestions.js");

const router = Router();

router.post("/generate", async (req, res) => {
    let { difficulty, skills, softSkills } = req.body;
    skills = Array.isArray(skills) ? skills : [skills];
    softSkills = Array.isArray(softSkills) ? softSkills : [softSkills];

    try {
        const questionResponse = await generateSkillAssessmentQuestions(difficulty, skills, softSkills);
        let questionContent = questionResponse.content.trim().replace(/```json/g, '').replace(/```/g, '');

        const questions = JSON.parse(questionContent);
        console.log(JSON.stringify(questions));

        const testData = { userId: "1", questions };
        const newTest = new Test(testData);
        const test = await newTest.save();

        res.status(200).json({ test, status: true });
    } catch (error) {
        console.log('Error processing request:', error);
        res.status(500).json({ error: 'Failed to generate or parse question data', status: false });
    }
});

router.post("/submit", async (req, res) => {
    const { answers, testId } = req.body;

    try {
        const test = await Test.findById(testId);
        if (!test) {
            return res.json({ error: "No test found", status: false });
        }
        test.answers = answers;
        await test.save();
        return res.json({ status: true });
    } catch (error) {
        console.log(error);
        return res.json({ error, status: false });
    }
});

module.exports = router;

const llm = require("./llmProvider.js");

async function generateSkillAssessmentQuestions(difficulty, skills, softSkills) {
    const system_message = `You are an expert interviewer who creates skill assessment tests.
    - **Technical Skills:** Generate questions for the following technologies: ${skills.join(", ")}.
    - **Soft Skills:** Create scenario-based questions to assess ${softSkills.join(", ")}.
    - **Difficulty Level:** ${difficulty}.
    `;

    const messages = [
        ["system", system_message],
        ["human", `Generate a JSON array of 10 questions:
         - 5 questions assessing technical skills with properties: 'topic', 'question', 'options', 'answer', and 'solution'.
         - 5 scenario-based questions assessing soft skills with properties: 'scenario', 'question', 'options', 'answer', and 'solution'.
         Ensure the options are multiple choice, and the answer is an index from options.`]
    ];

    try {
        const response = await llm.invoke(messages);
        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports = generateSkillAssessmentQuestions;

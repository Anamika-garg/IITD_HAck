import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What's your preferred way of solving problems?",
    options: [
      "Breaking down complex problems into smaller parts",
      "Analyzing data and finding patterns",
      "Coming up with creative solutions",
      "Working with others to find solutions"
    ]
  },
  {
    id: 2,
    question: "Which type of projects interest you the most?",
    options: [
      "Building websites and applications",
      "Working with data and statistics",
      "Creating automated systems",
      "Designing user experiences"
    ]
  },
  {
    id: 3,
    question: "How do you prefer to work?",
    options: [
      "Independently on focused tasks",
      "In a team environment",
      "Mix of both, depending on the project",
      "Leading and coordinating with others"
    ]
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle quiz completion
      console.log('Quiz completed:', newAnswers);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="mb-8">
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-6 py-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-between group"
                >
                  <span>{option}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
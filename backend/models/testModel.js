const mongoose = require("mongoose");

const testQuestionSchema = new mongoose.Schema({
  topic: {type:String , required:true},
  question: {type:String , required:true},
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true },
  solution: { type: String, required: true }
});

const testSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  questions: [testQuestionSchema],
  answers: [String],
  score: { type: Number }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
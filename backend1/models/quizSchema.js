const mongoose = require('mongoose');

// Define the tag schema
const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Define the main quiz schema
const QuizSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true
    },
    description: String,
    answers: {
        answer_a: String,
        answer_b: String,
        answer_c: String,
        answer_d: String,
        answer_e: String,
        answer_f: String
    },
    multiple_correct_answers: {
        type: String,
        enum: ['true', 'false'],
        required: true
    },
    correct_answers: {
        answer_a_correct: String,
        answer_b_correct: String,
        answer_c_correct: String,
        answer_d_correct: String,
        answer_e_correct: String,
        answer_f_correct: String
    },
    correct_answer: String,
    explanation: String,
    tip: String,
    tags: [TagSchema],
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    }
});

// Create the model from the schema
const Quiz = mongoose.model('QUIZ', QuizSchema);

module.exports = Quiz;

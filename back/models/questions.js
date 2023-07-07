const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    question_text: { type: String, required: true },
    answers_ids: {
        type: [String],
        default: []
      }
});

const Question = mongoose.model('Question', questionSchema, 'questions');

module.exports = Question;
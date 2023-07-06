const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    answer_text: { type: String, required: true },
    gained_likes_number: { type: String, required: true }
});

const Answer = mongoose.model('Answer', answerSchema, 'answers');

module.exports = Answer;
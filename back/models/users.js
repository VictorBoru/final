const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true },
    asked_questions_ids: {
        type: [String],
        default: []
      }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
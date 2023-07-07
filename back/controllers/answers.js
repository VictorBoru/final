const uniqid = require("uniqid");
const AnswerModel = require('../models/answers');
const QuestionModel = require('../models/questions');

module.exports.ANSWERS = async (req, res) => {
  try {
    const { id } = req.params; // get the question id from the route parameter
    const question = await QuestionModel.findOne({ id });

    // Find answers by their ids
    const answers = await AnswerModel.find({
      id: { $in: question.answers_ids },
    });

    res.status(200).json({ answers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during fetching answers.' });
  }
};

module.exports.ANSWER = async (req, res) => {
    try {
      const { id } = req.params; // get the question id from the route parameter
      const { answer_text } = req.body;
  
      // Create a new answer
      const newAnswer = new AnswerModel({
        id: uniqid(),
        answer_text,
        gained_likes_number: 0 // corrected this line
      });
      
      await newAnswer.save();
  
      // Add the answer's id to the question's answers_ids field
      const question = await QuestionModel.findOne({ id });
      question.answers_ids.push(newAnswer.id);
      await question.save();
  
      res.status(200).json({ message: 'Answer created successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred during answer creation.' });
    }
};

module.exports.DELETE_ANSWER = async (req, res) => {
    try {
      const { id } = req.params; // get the answer id from the route parameter
  
      // Delete the answer
      await AnswerModel.deleteOne({ id });
  
      res.status(200).json({ message: 'Answer deleted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred during answer deletion.' });
    }
};
  
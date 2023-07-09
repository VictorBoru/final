const uniqid = require("uniqid");
const QuestionModel = require("../models/questions");

module.exports.QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    res.status(200).json({ questions: questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during fetching questions.' });
  }
};

module.exports.QUESTION_ID = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await QuestionModel.findOne({ id });

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    res.status(200).json({ question: question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during fetching the question.' });
  }
};

module.exports.QUESTION = async (req, res) => {
  try {
    const { question_text } = req.body;
    
    if (!question_text) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    const newQuestion = new QuestionModel({
      id: uniqid(),
      question_text
    });
    
    await newQuestion.save();
    
    res.status(200).json({ message: 'Question created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during question creation.' });
  }
};

module.exports.DELETE_QUESTION = async (req, res) => {
  const question = await QuestionModel.findOneAndDelete({ id: req.params.id });
  res.status(200).json({ response: "Question was deleted successfully", question: question });
};

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
      const { id } = req.params;
      const { answer_text } = req.body;
  
      const newAnswer = new AnswerModel({
        id: uniqid(),
        answer_text,
        gained_likes_number: 0
      });
      
      await newAnswer.save();
  
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
      const { id } = req.params;

      await AnswerModel.deleteOne({ id });
  
      res.status(200).json({ message: 'Answer deleted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred during answer deletion.' });
    }
};

module.exports.LIKES = async (req, res) => {
    try {
      const { id, answerId } = req.params;
      const question = await QuestionModel.findOne({ id });
      const answer = question.answers.find((ans) => ans.id === answerId);
  
      if (!answer) {
        return res.status(404).json({ message: "Answer not found" });
      }
  
      res.status(200).json({ likes: answer.gained_likes_number });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while fetching the like count" });
    }
};

module.exports.UPDATE_LIKES = async (req, res) => {
    try {
      const { id, answerId } = req.params;
      const { action } = req.body;

      const answer = await AnswerModel.findOne({ id, _id: answerId });
  
      if (!answer) {
        return res.status(404).json({ message: "Answer not found" });
      }
  
      if (action === "like") {
        answer.gained_likes_number += 1;
      } else if (action === "dislike") {
        answer.gained_likes_number -= 1;
      }
  
      await answer.save();
  
      res.status(200).json({ message: "Like count updated successfully", answer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while updating like count" });
    }
};
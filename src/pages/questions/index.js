import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Navbar from '../../components/navbar/Navbar';
import Link from 'next/link';

const QuestionsPage = ({ questions = [], answers = [] }) => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredQuestions = filterQuestions(questions, answers, filter);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <label>
            Filter:
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="withAnswers">With Answers</option>
              <option value="withoutAnswers">Without Answers</option>
            </select>
          </label>
        </div>
        {filteredQuestions.map((question) => (
          <div key={question.id} className={styles.questionCard}>
            <Link href={`/question/${question.id}`}>
              <h2 className={styles.questionText}>{question.question_text}</h2>
            </Link>
            <div className={styles.answer}>
              <h3>Answers:</h3>
              {renderAnswers(question.answers)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Filter questions and answers based on the selected filter
const filterQuestions = (questions, answers, filter) => {
  if (filter === 'withAnswers') {
    return questions.filter((question, index) => answers[index]?.length > 0);
  } else if (filter === 'withoutAnswers') {
    return questions.filter((question, index) => answers[index]?.length === 0);
  } else {
    return questions.map((question, index) => ({
      ...question,
      answers: answers[index] || [],
    }));
  }
};

const renderAnswers = (answers) => {
  if (answers && answers.length > 0) {
    return answers.map((answer, index) => <p key={index}>{answer}</p>);
  } else {
    return <p>No answers available</p>;
  }
};

export async function getServerSideProps(ctx) {
  try {
    const token = ctx.req.cookies.jwt;
    const response = await axios.get('http://localhost:8081/questions', {
      headers: {
        Authorization: `${token}`,
      },
    });

    let questions = response.data.questions;
    if (!Array.isArray(questions)) {
      questions = [];
    }

    const answers = await Promise.all(
      questions.map(async (question) => {
        const answersResponse = await axios.get(`http://localhost:8081/question/${question.id}/answers`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        return answersResponse.data.answers.map((answer) => answer.answer_text);
      })
    );

    return {
      props: {
        questions,
        answers,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        questions: [],
        answers: [],
      },
    };
  }
}

export default QuestionsPage;
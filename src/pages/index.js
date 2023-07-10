import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Navbar from '../components/navbar/Navbar';
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
          <label className={styles.filterLabel}>
            Filter:
            <select value={filter} onChange={handleFilterChange} className={styles.filterSelect}>
              <option value="all">All</option>
              <option value="withAnswers">With Answers</option>
              <option value="withoutAnswers">Without Answers</option>
            </select>
          </label>
        </div>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <Link href={`/question/${question.id}`} className={styles.link}>
              <div key={question.id} className={styles.questionCard}>
                  <h2 className={styles.questionText}>{question.question_text}</h2>
                <div className={styles.answer}>
                  <h3 className={styles.answerTitle}>Answers:</h3>
                  {renderAnswers(question.answers)}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h2 className={styles.noQuestions}>To see questions, please register or login.</h2>
        )}
      </div>
    </div>
  );
};

const filterQuestions = (questions, answers, filter) => {
  let combined = questions.map((question, index) => ({
    ...question,
    answers: answers[index] || [],
  }));

  if (filter === 'withAnswers') {
    return combined.filter((item) => item.answers.length > 0);
  } else if (filter === 'withoutAnswers') {
    return combined.filter((item) => item.answers.length === 0);
  } else {
    return combined;
  }
};

const renderAnswers = (answers) => {
  if (answers && answers.length > 0) {
    return <p>{answers[0]}</p>;
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
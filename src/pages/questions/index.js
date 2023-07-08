import React from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Navbar from '../../components/navbar/Navbar';
import Link from 'next/link';  // Import Link from Next.js

const QuestionsPage = ({ questions = [], answers = [] }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {questions.map((question, index) => (
          <div key={question.id} className={styles.questionCard}>
            <Link href={`/question/${question.id}`}>
              <h2 className={styles.questionText}>{question.question_text}</h2>
            </Link>
            <div className={styles.answer}>
              <h3>Answers:</h3>
              {answers[index]?.map((answer, i) => (
                <p key={i}>{answer}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default QuestionsPage;

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
      questions.map(question =>
        axios.get(`http://localhost:8081/question/${question.id}/answers`, {
          headers: {
            Authorization: `${token}`,
          },
        })
      )
    );

    const answersByQuestion = answers.map(answer => answer.data.answers.map(a => a.answer_text));

    console.log('getServerSideProps questions:', questions);
    console.log('getServerSideProps answers:', answersByQuestion);

    return { props: { questions, answers: answersByQuestion } };
  } catch (err) {
    console.log(err);
    return { props: { questions: [], answers: [] } };
  }
}

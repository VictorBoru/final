import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import cookie from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';
import styles from './styles.module.css';

const QuestionPage = ({ question = null, answers = [] }) => {
  const [newAnswer, setNewAnswer] = useState('');
  const router = useRouter();

  const handleAnswerChange = (event) => {
    setNewAnswer(event.target.value);
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    const token = cookie.get('jwt');

    try {
      await axios.post(
        `http://localhost:8081/question/${question.id}/answer`,
        {
          answer_text: newAnswer,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      router.replace(router.asPath);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerDelete = async (id) => {
    const token = cookie.get('jwt');

    try {
      await axios.delete(`http://localhost:8081/answer/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      router.replace(router.asPath);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuestionDelete = async () => {
    const token = cookie.get('jwt');
  
    try {
      await axios.delete(`http://localhost:8081/question/${question.id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      router.replace(router.asPath);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.questionContainer}>
          <h2 className={styles.questionText}>{question.question_text}</h2>
          <button
            className={styles.deleteButton}
            onClick={handleQuestionDelete}
          >
            Delete Question
          </button>
        </div>
  
        {answers.map((answer) => (
          <div key={answer.id} className={styles.answerCard}>
            <p className={styles.answerText}>{answer.answer_text}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleAnswerDelete(answer.id)}
            >
              Delete
            </button>
          </div>
        ))}
  
        <form onSubmit={handleAnswerSubmit} className={styles.answerForm}>
          <input
            type="text"
            value={newAnswer}
            onChange={handleAnswerChange}
            placeholder="Write your answer here"
            className={styles.answerInput}
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
};

export async function getServerSideProps(ctx) {
  let question = null;
  let answers = [];
  const { id } = ctx.params;
  try {
    const token = ctx.req.cookies.jwt;
    const response = await axios.get(`http://localhost:8081/question/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    question = response.data.question;

    const answerResponse = await axios.get(
      `http://localhost:8081/question/${id}/answers`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    answers = answerResponse.data.answers;
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      question,
      answers,
    },
  };
};

export default QuestionPage;
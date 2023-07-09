import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import cookie from 'js-cookie';

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
      await axios.post(`http://localhost:8081/question/${question.id}/answer`, {
        answer_text: newAnswer,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });

      router.replace(router.asPath);  // Refresh the page to show the new answer
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

      router.replace(router.asPath);  // Refresh the page to show the deleted answer
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{question.question_text}</h2>

      {answers.map((answer) => (
        <div key={answer.id}>
          <p>{answer.answer_text}</p>
          <button onClick={() => handleAnswerDelete(answer.id)}>Delete</button>
        </div>
      ))}

      <form onSubmit={handleAnswerSubmit}>
        <input type="text" value={newAnswer} onChange={handleAnswerChange} placeholder="Write your answer here" />
        <button type="submit">Submit</button>
      </form>
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

    const answerResponse = await axios.get(`http://localhost:8081/question/${id}/answers`, {
      headers: {
        Authorization: `${token}`,
      },
    });

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
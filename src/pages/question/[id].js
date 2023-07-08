import axios from 'axios';
import styles from './styles.module.css';
import Navbar from '../../components/navbar/Navbar';

const QuestionPage = ({ question, answers = [] }) => {
  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.questionCard}>
          <h2 className={styles.questionText}>{question.question_text}</h2>
          <div className={styles.answer}>
            <h3>Answers:</h3>
            {answers.map((answer, i) => (
              <p key={i}>{answer}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );  
};

export default QuestionPage;

export async function getServerSideProps(ctx) {
  try {
    const { id } = ctx.params;  // Extract question id from context
    const token = ctx.req.cookies.jwt;

    const questionResponse = await axios.get(`http://localhost:8081/question/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const question = questionResponse.data;

    const answersResponse = await axios.get(`http://localhost:8081/question/${id}/answers`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const answers = answersResponse.data.answers.map(a => a.answer_text);

    return { props: { question, answers } };
  } catch (err) {
    console.log(err);
    return { props: { question: null, answers: [] } };
  }
}

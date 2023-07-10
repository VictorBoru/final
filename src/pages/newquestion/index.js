import { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar/Navbar';

const NewQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = cookie.get('jwt');
      const response = await axios.post(
        'http://localhost:8081/question',
        { question_text: questionText },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log('Question added:', response.data);
      router.push('/questions');
    } catch (error) {
      console.log('Error adding question:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Add New Question</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Question Text:
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className={styles.input}
            required
          />
          </label>
          <input type="submit" value="Add Question" className={styles.submit} />
        </form>
      </div>
    </div>
  );
};

export default NewQuestion;
import React from 'react';
import styles from '../questioncard/styles.module.css';
import Link from 'next/link';

const QuestionCard = ({ question_text }) => {
  return (
    <>
      <Link href={`trip/${id}`} className={styles.link}>
        <div className={styles.card}>
          <h1>
            {destination}
          </h1>
          <img className={styles.image} src={imageUrl} />
          <div className={styles.time}>
            <div>{date}</div>
            <div>{duration} Days</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default QuestionCard;
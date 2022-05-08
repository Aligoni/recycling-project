import React from "react";
import Link from 'next/link';
import styles from "./Card.module.scss";
import ReactTimeAgo from 'react-time-ago'

const Card = ({ article }) => {
  return (
    <>
      <article className={`${styles.card__content} ${styles.grid}`}>
        <header className={styles.card__header}>
          <div className="w-full h-40">
            <img className={'w-full h-full object-contain'} src={article.image} />
          </div>
          <div className={styles.card__flex}>
            <h1 className={styles.card__header_title}>{article.title}</h1>
            <span className={styles.card__header_time}>
              <i><ReactTimeAgo date={new Date(article.createdAt).getTime()} /></i>
            </span>
          </div>
        </header>
        <p className={styles.card__body}>
          {article.summary}
        </p>
        <p className={styles.card__body}>
          {article.likes} like(s)
        </p>
        <div className={styles.card__button}>
          <Link href={`/admin/article/${article.id}`}>
            <a>Read</a>
          </Link>
        </div>
      </article>
    </>
  );
};

export default Card;

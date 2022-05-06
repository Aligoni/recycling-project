import React from "react";
import Link from 'next/link';
import styles from "./Card.module.scss";

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
              <i>25 min ago</i>
            </span>
          </div>
        </header>
        <p className={styles.card__body}>
          {article.summary}
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

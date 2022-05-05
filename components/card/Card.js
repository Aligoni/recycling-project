import React from "react";
import styles from "./Card.module.scss";
const Card = () => {
  return (
    <>
      <article className={`${styles.card__content} ${styles.grid}`}>
        <header className={styles.card__header}>
          <img className={styles.card__header__img} src="/card.jpg" />
          <div className={styles.card__flex}>
            <h1 className={styles.card__header_title}>Title</h1>
            <span className={styles.card__header_time}>
              <i>25 min ago</i>
            </span>
          </div>
        </header>
        <p className={styles.card__body}>
          Laborum nostrud irure officia est ullamco. Reprehenderit laboris dolor
          amet aliquip deserunt enim in magna magna sunt irure ad consequat.
          Dolore qui aliqua aliqua non velit nostrud magna id. Amet ea fugiat
          tempor ut consectetur aliqua laborum officia quis sunt sunt ex id.
          Nulla quis anim proident consectetur adipisicing elit sit sint. Culpa
          tempor eiusmod aliqua consequat.
        </p>
        <div className={styles.card__button}>
          <a>Read</a>
          <a>Edit</a>
        </div>
      </article>
    </>
  );
};

export default Card;

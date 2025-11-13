import styles from "./whyChooseUsCard.module.css";

const WhyChooseUsCard = ({ cardData }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardIconWrapper}>
        <span className={styles.cardIcon}>{cardData.icon}</span>
      </div>
      <h2 className={styles.cardTitle}>{cardData.title}</h2>
      <p className={styles.cardDescription}>{cardData.description}</p>
    </div>
  );
};

export default WhyChooseUsCard;

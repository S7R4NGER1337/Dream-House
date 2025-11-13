import styles from "./whyChooseUsCard.module.css";

const WhyChooseUsCard = ({ cardData }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardIconWrapper}>
        <img className={styles.cardIcon} src={cardData.icon} alt="icon" />
      </div>
      <h2 className={styles.cardTitle}>{cardData.title}</h2>
      <p className={styles.cardDescription}>{cardData.description}</p>
    </div>
  );
};

export default WhyChooseUsCard;

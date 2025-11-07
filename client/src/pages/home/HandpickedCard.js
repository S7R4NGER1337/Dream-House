import styles from "./handpickedCard.module.css";

export default function HandpickedForYouCard({ propertyData }) {
  const { image, price, location, beds, baths, space } = propertyData;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.cardImage}
          src={image}
          alt={`Property in ${location}`}
        />
      </div>
      <section className={styles.propertyInfo}>
        <h2 className={styles.price}>${price.toLocaleString("en-US")}</h2>
        <p className={styles.location}>{location}</p>
        <p className={styles.details}>
          {beds} beds, {baths} baths, {space} sqft
        </p>
      </section>
    </div>
  );
}

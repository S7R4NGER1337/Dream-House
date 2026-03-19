import { useNavigate } from "react-router-dom";
import styles from "./handpickedCard.module.css";

export default function HandpickedForYouCard({ propertyData }) {
  const navigate = useNavigate()
  const { coverImage, price, location, beds, baths, sqft, _id } = propertyData;

  return (
    <div className={styles.cardContainer} onClick={() => navigate(`/property/${_id}`)}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.cardImage}
          src={coverImage}
          alt={`Property in ${location}`}
          loading="lazy"
        />
      </div>
      <section className={styles.propertyInfo}>
        <h2 className={styles.price}>${price.toLocaleString("en-US")}</h2>
        <p className={styles.location}>{location}</p>
        <p className={styles.details}>
          {beds} beds · {baths} baths · {sqft?.toLocaleString("en-US")} sqft
        </p>
      </section>
    </div>
  );
}

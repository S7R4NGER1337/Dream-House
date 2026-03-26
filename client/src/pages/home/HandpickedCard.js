import { useNavigate } from "react-router-dom";
import styles from "./handpickedCard.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function HandpickedForYouCard({ propertyData, animDelay = 0 }) {
  const navigate = useNavigate()
  const { ref, isVisible } = useScrollAnimation();
  const { coverImage, price, location, beds, baths, sqft, _id } = propertyData;

  return (
    <div
      ref={ref}
      className={`${styles.cardContainer} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${animDelay}ms` }}
      onClick={() => navigate(`/property/${_id}`)}
    >
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

import HandpickedForYouCard from "./HandpickedCard";
import styles from "./handpickedForYou.module.css";

export default function HandpickedForYou() {
  const fakeDb = [
    {
      image: "/unnamed.png",
      price: 120000,
      location: "Sunnyvale, CA",
      beds: 4,
      baths: 3,
      space: 2100,
    },
    {
      image: "/unnamed (1).png",
      price: 850000,
      location: "Austin, TX",
      beds: 3,
      baths: 2,
      space: 1800,
    },
    {
      image: "/unnamed (2).png",
      price: 2500000,
      location: "Miami, FL",
      beds: 5,
      baths: 5,
      space: 4500,
    },
    {
      image: "/unnamed (3).png",
      price: 975000,
      location: "Denver, CO",
      beds: 4,
      baths: 3,
      space: 2300,
    },
  ];

  return (
    <div className={styles.handpickedForYouContainer}>
      <h1 className={styles.handpickedForYouTitle}>Handpicked For You</h1>
      <p className={styles.handpickedForYouSubtitle}>
        Explore our exclusive selection of featured properties. Each home is
        chosen for its unique character and exceptional value.
      </p>
      <div className={styles.handpickedForYouItems}>
        {fakeDb.map((propertyData) => (
          <HandpickedForYouCard propertyData={propertyData} />
        ))}
      </div>
    </div>
  );
}

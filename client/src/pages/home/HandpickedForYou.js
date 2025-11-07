import HandpickedForYouCard from "./HandpickedCard";
import styles from "./handpickedForYou.module.css";
import { useNavigate } from 'react-router-dom'

export default function HandpickedForYou() {
  const navigate = useNavigate()
  const fakeDb = [
    {
      image: "/unnamed.png",
      price: 120000,
      location: "Sunnyvale, CA",
      beds: 4,
      baths: 3,
      space: 2100,
      _id: 0,
    },
    {
      image: "/unnamed (1).png",
      price: 850000,
      location: "Austin, TX",
      beds: 3,
      baths: 2,
      space: 1800,
      _id: 1,
    },
    {
      image: "/unnamed (2).png",
      price: 2500000,
      location: "Miami, FL",
      beds: 5,
      baths: 5,
      space: 4500,
      _id: 2,
    },
    {
      image: "/unnamed (3).png",
      price: 975000,
      location: "Denver, CO",
      beds: 4,
      baths: 3,
      space: 2300,
      _id: 3,
    },
  ];

  return (
    <div className={styles.handpickedForYouContainer}>
      <section className={styles.handpickedInfo}>
        <h1 className={styles.handpickedForYouTitle}>Handpicked For You</h1>
        <p className={styles.handpickedForYouSubtitle}>
          Explore our exclusive selection of featured properties. Each home is
          chosen for its unique character and exceptional value.
        </p>
      </section>
      <div className={styles.handpickedForYouItems}>
        {fakeDb.map((propertyData) => (
          <HandpickedForYouCard propertyData={propertyData} key={propertyData._id}/>
        ))}
      </div>
      <button className={styles.viewAll} onClick={() => navigate('/properties')}>View All Properties</button>
    </div>
  );
}

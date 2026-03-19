import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HandpickedForYouCard from "./HandpickedCard";
import styles from "./handpickedForYou.module.css";

export default function HandpickedForYou() {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetch('/property/getAll')
      .then(res => res.ok ? res.json() : [])
      .then(data => setProperties(data.slice(0, 4)))
      .catch(() => setProperties([]))
  }, [])

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
        {properties.map((propertyData) => (
          <HandpickedForYouCard propertyData={propertyData} key={propertyData._id} />
        ))}
      </div>
      <button className={styles.viewAll} onClick={() => navigate('/properties')}>View All Properties</button>
    </div>
  );
}

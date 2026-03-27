import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HandpickedForYouCard from "./HandpickedCard";
import styles from "./handpickedForYou.module.css";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function HandpickedForYou() {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();

  useEffect(() => {
    fetch('/property/featured')
      .then(res => res.ok ? res.json() : [])
      .then(data => setProperties(data))
      .catch(() => setProperties([]))
  }, [])

  return (
    <div className={styles.handpickedForYouContainer}>
      <section ref={infoRef} className={`${styles.handpickedInfo} ${infoVisible ? styles.visible : ''}`}>
        <h1 className={styles.handpickedForYouTitle}>Handpicked For You</h1>
        <p className={styles.handpickedForYouSubtitle}>
          Explore our exclusive selection of featured properties. Each home is
          chosen for its unique character and exceptional value.
        </p>
      </section>
      <div className={styles.handpickedForYouItems}>
        {properties.map((propertyData, index) => (
          <HandpickedForYouCard propertyData={propertyData} key={propertyData._id} animDelay={index * 100} />
        ))}
      </div>
      <button className={styles.viewAll} onClick={() => navigate('/properties')}>View All Properties</button>
    </div>
  );
}

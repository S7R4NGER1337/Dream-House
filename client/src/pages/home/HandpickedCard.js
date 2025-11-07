import styles from './handpickedCard.module.css'

export default function HandpickedForYouCard({propertyData}) {
    return <div className={styles.HandpickedContainer}>
        <img className={styles.hanpickedImage} src={propertyData.image} alt='propertyImage' />
        <section className={styles.propertyInfo}>
            <h1>${propertyData.price}</h1>
            <p>{propertyData.location}</p>
            <p>{propertyData.beds} beds, {propertyData.baths} baths, {propertyData.space} sqft</p>
        </section>
    </div>
}
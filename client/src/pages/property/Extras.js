import styles from './extras.module.css';

export default function Extras({ beds, baths, sqft, build }) {
    return (
        <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
                <img src="/bed-solid-full.svg" alt="bedrooms" />
                <span>{beds} Bedroom{beds !== 1 ? 's' : ''}</span>
            </div>
            <div className={styles.detailItem}>
                <img src="/bath-solid-full.svg" alt="bathrooms" />
                <span>{baths} Bathroom{baths !== 1 ? 's' : ''}</span>
            </div>
            <div className={styles.detailItem}>
                <img src="/ruler-combined-solid-full.svg" alt="area" />
                <span>{sqft?.toLocaleString('en-US')} sq ft</span>
            </div>
            <div className={styles.detailItem}>
                <img src="/calendar-days-regular-full.svg" alt="year built" />
                <span>Built in {build}</span>
            </div>
        </div>
    );
}

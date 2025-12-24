import styles from './extras.module.css';

export default function Extras() {
    return (
        <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
                <img src="/bed-solid-full.svg" alt="bedrooms" />
                <span>4 Bedrooms</span>
            </div>
            <div className={styles.detailItem}>
                <img src="/bath-solid-full.svg" alt="bathrooms" />
                <span>3 Bathrooms</span>
            </div>
            <div className={styles.detailItem}>
                <img src="/ruler-combined-solid-full.svg" alt="area" />
                <span>2,500 sq ft</span>
            </div>
            <div className={styles.detailItem}>
                <img src="/calendar-days-regular-full.svg" alt="year built" />
                <span>Built in 2021</span>
            </div>
        </div>
    );
}

import styles from './property.module.css'

export default function Property() {
    return <div className={styles.propertyContainer}>
        <div className={styles.nameAndPriceContainer}>
            <section className={styles.nameAndStreet}>
                <h1 className={styles.houseName}>Modern Suburban Oasis</h1>
                <p className={styles.houseStreet}>123 Maple Street, Sunnyvale, CA 94087</p>
            </section>
            <section className={styles.housePriceContainer}>
                <h1 className={styles.housePrice}>$1,200,000</h1>
                <p className={styles.houseMortgage}>Est. Mortgage: $6,500/mo</p>
            </section>
        </div>
    </div>
}
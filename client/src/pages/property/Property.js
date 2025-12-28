import { useEffect } from 'react';
import ContactAgent from './ContactAgent';
import HomeDetails from './HomeDetails';
import styles from './property.module.css';

export default function Property() {
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    
    return (
        <>
            <div className={styles.propertyContainer}>
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

                <div className={styles.photosGrid}>
                    <div className={`${styles.photoWrapper} ${styles.mainPhoto}`}>
                        <img src='/unnamed.png' alt='Main view' />
                    </div>
                    <div className={styles.photoWrapper}>
                        <img src='/unnamed (2).png' alt='Interior' />
                    </div>
                    <div className={styles.photoWrapper}>
                        <img src='/unnamed (3).png' alt='Pool' />
                    </div>
                    <div className={styles.photoWrapper}>
                        <img src='/unnamed.png' alt='Backyard' />
                    </div>
                    <div className={`${styles.photoWrapper} ${styles.lastPhoto}`}>
                        <img src='/unnamed (1).png' alt='Night view' />
                        <button className={styles.showAllBtn}>
                            <span className={styles.icon}>⠿</span> Show all photos
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.homeDataContainer}>
                <HomeDetails />
                <ContactAgent />
            </div>
        </>
    );
}
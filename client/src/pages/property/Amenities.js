import styles from './amenities.module.css'

export default function Amenities({ amenities = [] }) {
    return (
        <section className={styles.amenities}>
            <h1 className={styles.amenitiesTtitle}>Amenities</h1>
            <div className={styles.amenitiesContainer}>
                {amenities.map(amenity =>
                    <Amenity key={amenity} title={amenity} />
                )}
            </div>
        </section>
    )
}

const Amenity = ({ title }) => {
    return (
        <section className={styles.amenity}>
            <img src='/check-solid-full.svg' className={styles.amenityIcon} alt='amenityIcon' />
            <p className={styles.amenityTitle}>{title}</p>
        </section>
    )
}

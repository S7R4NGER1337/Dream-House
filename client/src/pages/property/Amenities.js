import styles from './amenities.module.css'

export default function Amenities() {

    const testAmenities = [
        'Central Air Conditioning',
        'Hardwood Floors',
        'Swimming Pool',
        'Two-Car Garage',
        'Smart Home System',
        'Fireplace',
        'Gourmet Kitchen',
        'Walk-in Closets',
        'Landscaped Garden'
    ]

    return (
        <section className={styles.amenities}>
            <h1 className={styles.amenitiesTtitle}>Amenities</h1>
            <div className={styles.amenitiesContainer}>
                {testAmenities.map(amenity =>
                    <Amenity title={amenity} />
                )}
            </div>
        </section>
    )
}



const Amenity = ({ title }) => {
    return <section className={styles.amenity}>
        <img src='/check-solid-full.svg' className={styles.amenityIcon} alt='amenityIcon' />
        <p className={styles.amenityTitle}>{title}</p>
    </section>

}
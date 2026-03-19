import styles from './homeDetails.module.css';
import Amenities from './Amenities';
import Extras from './Extras';
import Line from '../../components/Line';

export default function HomeDetails({ property }) {
    return (
        <div className={styles.homeDetailsContainer}>
            <Extras
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                build={property.build}
            />
            <Line />
            <div className={styles.aboutTitleContainer}>
                <h3 className={styles.aboutTitle}>About This Home</h3>
                <p className={styles.aboutSubitle}>{property.description}</p>
            </div>
            <Line />
            <Amenities amenities={property.amenities} />
            <Line />
        </div>
    );
}

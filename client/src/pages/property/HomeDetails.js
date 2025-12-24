import styles from './homeDetails.module.css';
import Amenities from './Amenities';
import Extras from './Extras';
import Line from '../../components/Line';

export default function HomeDetails() {
    return (
        <div className={styles.homeDetailsContainer}>
            <Extras />
            <Line />
            <div className={styles.aboutTitleContainer}>
                <h3 className={styles.aboutTitle}>About This Home</h3>
                <p className={styles.aboutSubitle}>Welcome to your dream home in the heart of Sunnyvale. This stunning property, built in 2018, offers the perfect blend of modern luxury and comfortable living. With an open-concept floor plan, high ceilings, and an abundance of natural light, this home is designed for both relaxation and entertaining. The gourmet kitchen features top-of-the-line appliances, quartz countertops, and a large island perfect for family gatherings. The spacious master suite is a true retreat, complete with a spa-like bathroom and a walk-in closet. Step outside to your private backyard oasis, featuring a beautifully landscaped garden and a patio area ideal for summer barbecues. Located in a friendly, sought-after neighborhood with top-rated schools, parks, and easy access to major tech campuses.</p>
            </div>
            <Line />
            <Amenities />
            <Line />
        </div>
    );
}

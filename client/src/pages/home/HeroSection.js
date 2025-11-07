import styles from "./heroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.heroSectionContainer}>
      <h1 className={styles.heroSectionTitle}>Your Journey Home Starts Here</h1>
      <p className={styles.heroSectionSubtitle}>
        Discover a curated selection of premier properties and connect with
        expert agents who are dedicated to finding your perfect home.
      </p>
      <div className={styles.heroSectionFilters}>
        <input className={styles.heroSectionFilterInput} type="text" placeholder="Enter a location or keyword" />
        <select name="type"  className={styles.heroSectionFilterInput} >
          <option value="">Property Type</option>
          <option value="volvo">House</option>
          <option value="saab">Apartment</option>
          <option value="mercedes">Condo</option>
        </select>
        <select name="price"  className={styles.heroSectionFilterInput} >
          <option value="">Price Range</option>
          <option value="volvo">$200k - $400k</option>
          <option value="volvo">$400k - $600k</option>
          <option value="volvo">$600k - $800k</option>
          <option value="volvo">$800k+</option>
        </select>
        <button className={styles.heroSectionButton} >Search</button>
      </div>
    </div>
  );
}

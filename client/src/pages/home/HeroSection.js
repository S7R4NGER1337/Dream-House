import styles from "./heroSection.module.css";
import { useState } from "react";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    const filters = {
      location,
      propertyType,
      priceRange,
    };
    console.log("filters:", filters);
  };

  return (
    <>
      <div className={styles.heroSectionContainer}>
        <h1 className={styles.heroSectionTitle}>
          Your Journey Home Starts Here
        </h1>
        <p className={styles.heroSectionSubtitle}>
          Discover a curated selection of premier properties and connect with
          expert agents who are dedicated to finding your perfect home.
        </p>
        <div className={styles.heroSectionFilters}>
          <section className={styles.searchSection}>
            <img
              className={styles.searchIcon}
              src="/magnifying-glass-solid-full.svg"
              alt="searchIcon"
            />
            <input
              className={styles.heroSectionFilterInput}
              type="text"
              placeholder="Enter a location or keyword"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </section>
          <select
            name="type"
            className={styles.heroSectionFilterInput}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
          </select>
          <select
            name="price"
            className={styles.heroSectionFilterInput}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="200-400">$200k - $400k</option>
            <option value="400-600">$400k - $600k</option>
            <option value="600-800">$600k - $800k</option>
            <option value="800+">$800k+</option>
          </select>

          <button className={styles.heroSectionButton} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </>
  );
}

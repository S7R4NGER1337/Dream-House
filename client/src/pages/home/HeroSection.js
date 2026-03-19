import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./heroSection.module.css";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (beds) params.set("beds", beds);
    navigate(`/properties?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const bgStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/heroSectionBackground.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className={styles.heroSectionContainer} style={bgStyle}>
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
            placeholder="City, neighborhood or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </section>
        <select
          className={styles.heroSectionFilterInput}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="1000000">Up to $1,000,000</option>
          <option value="1500000">Up to $1,500,000</option>
          <option value="2000000">Up to $2,000,000</option>
          <option value="3000000">Up to $3,000,000</option>
        </select>
        <select
          className={styles.heroSectionFilterInput}
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        >
          <option value="">Any Beds</option>
          <option value="2">2+ Beds</option>
          <option value="3">3+ Beds</option>
          <option value="4">4+ Beds</option>
          <option value="5">5+ Beds</option>
        </select>
        <button className={styles.heroSectionButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

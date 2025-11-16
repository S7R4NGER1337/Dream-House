import styles from "./services.module.css";

export default function Services() {
  return (
    <div className={styles.servicesContainer}>
      <section className={styles.aboutUsHeading}>
        <h1 className={styles.aboutUsTitle}>
          Comprehensive Real Estate Services
        </h1>
        <p className={styles.aboutUsSubtitle}>
          Whether you're buying your first home, selling a cherished property,
          or looking for the perfect rental, we provide expert guidance and
          tailored solutions for every step of your real estate journey.
        </p>
      </section>
      <section className={styles.homeSearchSectionWrapper}>
        <div className={styles.homeSearchContainer}>
          <div className={styles.imageColumn}>
            <img
              src="/heroSectionBackground.png"
              alt="Modern Home"
              className={styles.homeImage}
            />
          </div>

          <div className={styles.contentColumn}>
            <p className={styles.categoryTag}>BUYING A HOME</p>
            <h2 className={styles.title}>
              Find Your Perfect Place to Call Home
            </h2>
            <p className={styles.description}>
              Navigating the home buying process can be complex. Our dedicated
              agents simplify the journey, from understanding your needs and
              securing financing to finding off-market properties and
              negotiating the best possible price. We're committed to turning
              your homeownership dreams into reality.
            </p>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span> Personalized
                property searches tailored to your lifestyle and budget.
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span> Expert negotiation
                to ensure you get the best value for your investment.
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span> Seamless guidance
                through every step, from offer to closing.
              </li>
            </ul>

            <button className={styles.callToActionButton}>
              Start Your Home Search
            </button>
          </div>
        </div>
      </section>
      <section
        className={`${styles.homeSearchSectionWrapper} ${styles.homeSectionReverced}`}
      >
        <div className={styles.homeSearchContainer}>
          <div className={styles.imageColumn}>
            <img
              src="/unnamed.png"
              alt="Modern Home"
              className={styles.homeImage}
            />
          </div>

          <div className={styles.contentColumn}>
            <p className={styles.categoryTag}>Selling a Home</p>
            <h2 className={styles.title}>
              Maximize Your Return with a Trusted Partner
            </h2>
            <p className={styles.description}>
              Selling your home is a significant financial decision. We leverage
              strategic marketing, professional staging, and unparalleled market
              analysis to attract qualified buyers and secure the highest
              possible price for your property. Let us handle the details for a
              swift and profitable sale.
            </p>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span> Comprehensive
                market analysis to price your home competitively.
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span> Targeted marketing
                campaigns across multiple digital platforms.
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span> Skilled negotiation
                and transaction management for a stress-free close.
              </li>
            </ul>

            <button className={styles.callToActionButton}>
              Get a Free Home Valuation
            </button>
          </div>
        </div>
      </section>
      <section className={styles.homeSearchSectionWrapper}>
        <div className={styles.homeSearchContainer}>
          <div className={styles.imageColumn}>
            <img
              src="/unnamed (2).png"
              alt="Modern Home"
              className={styles.homeImage}
            />
          </div>

          <div className={styles.contentColumn}>
            <p className={styles.categoryTag}>Renting a Home</p>
            <h2 className={styles.title}>
              Discover Your Ideal Rental Property
            </h2>
            <p className={styles.description}>
              Finding the right rental can be challenging. Our team provides
              access to an extensive database of high-quality listings, from
              city apartments to suburban houses. We assist with every part of
              the rental process, including application, lease negotiation, and
              move-in coordination, ensuring you find a space you'll love to
              live in.
            </p>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span>
                Access to exclusive rental listings that match your criteria.
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span> Expert assistance
                with applications and lease agreements.
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkmark}>✔️</span> Streamlined process
                to make your move as smooth as possible.
              </li>
            </ul>

            <button className={styles.callToActionButton}>
              Browse Rental Listings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

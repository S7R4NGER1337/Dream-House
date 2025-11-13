import styles from "./ourStory.module.css";

const OurStorySection = () => {
  return (
    <section className={styles.ourStoryWrapper}>
      <div className={styles.ourStorycontainer}>
        <img
          src="/unnamed.png"
          alt="aboutUs"
          className={styles.ourStoryImage}
        />
        <section className={styles.ourStoryInfo}>
          <h1 className={styles.ourStoryInfoTitle}>Our Story</h1>
          <p className={styles.ourStoryInfoSubtitle}>
            Founded in 2010, Dream Homes was built on a simple yet powerful
            idea: to make the process of buying and selling homes a joyful and
            transparent experience. We started as a small, passionate team in a
            local neighborhood, driven by a commitment to client success and
            community values. Over the years, we've grown into a trusted name in
            real estate, but our core principles remain unchanged.
          </p>
          <p className={styles.ourStoryInfoSubtitle}>
            We believe that a home is more than just a transaction; it's the
            foundation for a lifetime of memories. Our journey has been one of
            building lasting relationships, embracing innovation, and
            consistently exceeding expectations. We are proud of our history and
            excited for the future we are building, one dream home at a time.
          </p>
        </section>
      </div>
    </section>
  );
};

export default OurStorySection;

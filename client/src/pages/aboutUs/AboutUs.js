import BigBanner from "../../components/BigBanner";
import styles from "./aboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={styles.aboutUsContainer}>
      <section className={styles.aboutUsHeading}>
        <h1 className={styles.aboutUsTitle}>About Dream House</h1>
        <p className={styles.aboutUsSubtitle}>
          Connecting people with their dream properties through dedication,
          expertise, and a passion for real estate.
        </p>
      </section>
      <div className={styles.ourStorycontainer}>
        <img src="/unnamed.png" alt="aboutUs" />
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
      <div className={styles.ourTeamContainer}>
        <h1>Meet Our Team</h1>
        <p>
          The driving force behind our success is our dedicated team of
          experienced professionals. Get to know the leaders committed to your
          real estate journey.
        </p>
        {/* {Render team members} */}
      </div>
      <div className={styles.whyUs}>
        <h1>Why Choose Us?</h1>
        <p>
          We offer a unique combination of technology, personalized service, and
          deep market expertise to give you a distinct advantage in your
          property search.
        </p>
        {/* {Render why choose us cards} */}
      </div>
      <BigBanner
        title="Ready to Start Your Journey?"
        subtitle="Whether you're looking to buy, sell, or simply explore your options, we're here to help. Reach out to our team for a personalized consultation."
        buttonName="Get In Touch"
        buttonPath="/"
      />
    </div>
  );
}

import BigBanner from "../../components/BigBanner";
import styles from "./aboutUs.module.css";
import OurStory from "./OurStory";
import OurTeam from "./OurTeam";
import WhyChooseUs from "./WhyChooseUs";
import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.aboutUsContainer}>
      <section className={styles.aboutUsHeading}>
        <h1 className={styles.aboutUsTitle}>About Dream House</h1>
        <p className={styles.aboutUsSubtitle}>
          Connecting people with their dream properties through dedication,
          expertise, and a passion for real estate.
        </p>
      </section>
      <OurStory />
      <OurTeam />
      <WhyChooseUs />
      <BigBanner
        title="Ready to Start Your Journey?"
        subtitle="Whether you're looking to buy, sell, or simply explore your options, we're here to help. Reach out to our team for a personalized consultation."
        buttonName="Get In Touch"
        buttonPath="/"
      />
    </div>
  );
}

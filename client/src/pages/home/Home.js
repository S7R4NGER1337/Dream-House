import BigBanner from "../../components/BigBanner";
import HandpickedForYou from "./HandpickedForYou";
import HeroSection from "./HeroSection";
import TestimonialSection from "./Testiominals";
import TheDream from "./TheDream";
import styles from "./home.module.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <HandpickedForYou />
      <TheDream />
      <div className={styles.bigBannerWrap}>
        <BigBanner
          title="Begin Your Journey Today"
          subtitle="Whether you're curious about the market or ready to make a move, our team is here to provide the insights and support you need. Connect with an agent for a complimentary consultation."
          buttonName="Contact an Agent"
          buttonPath="/"
        />
      </div>
      <TestimonialSection />
    </>
  );
}

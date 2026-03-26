import styles from "./bigBanner.module.css";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function BigBanner({
  title,
  subtitle,
  buttonName,
  buttonPath,
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div className={styles.bannerContainer}>
      <div ref={ref} className={`${styles.bannerContent} ${isVisible ? styles.visible : ''}`}>
        <h2 className={styles.bannerTitle}>{title}</h2>
        <p className={styles.bannerSubtitle}>{subtitle}</p>
        <Link to={buttonPath} className={styles.bannerButton}>
          {buttonName}
        </Link>
      </div>
    </div>
  );
}

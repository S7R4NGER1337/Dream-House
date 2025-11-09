import styles from "./bigBanner.module.css";
import { Link } from "react-router-dom";

export default function BigBanner({
  title,
  subtitle,
  buttonName,
  buttonPath,
}) {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <h2 className={styles.bannerTitle}>{title}</h2>
        <p className={styles.bannerSubtitle}>{subtitle}</p>
        <Link href={buttonPath} className={styles.bannerButton}>
          {buttonName}
        </Link>
      </div>
    </div>
  );
}

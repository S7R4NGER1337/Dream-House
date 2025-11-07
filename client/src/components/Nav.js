import styles from "./nav.module.css";
import { Link, useLocation } from "react-router";

export default function Nav() {
  const location = useLocation().pathname;

  return (
    <div className={styles.navContainer}>
      <section className={styles.siteLogoContainer}>
        <p className={styles.siteName}>Dream House</p>
      </section>
      <section className={styles.siteLinksContainer}>
        <Link
          className={location === "/" ? styles.selected : styles.siteLink}
          to="/"
        >
          Home
        </Link>
        <Link
          className={
            location === "/properties" ? styles.selected : styles.siteLink
          }
          to="/properties"
        >
          Properties
        </Link>
        <Link
          className={
            location === "/services" ? styles.selected : styles.siteLink
          }
          to="/services"
        >
          Services
        </Link>
        <Link
          className={
            location === "/aboutUs" ? styles.selected : styles.siteLink
          }
          to="/aboutUs"
        >
          AboutUs
        </Link>
        <Link
          className={
            location === "/contact" ? styles.selected : styles.siteLink
          }
          to="/contact"
        >
          Contact
        </Link>
      </section>
    </div>
  );
}

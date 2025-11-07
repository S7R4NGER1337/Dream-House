import styles from "./nav.module.css";
import { Link } from "react-router";

export default function Nav() {
  return (
    <div className={styles.navContainer}>
      <section className={styles.siteLogoContainer}>
        <p className={styles.siteName}>Dream House</p>
      </section>
      <section className={styles.siteLinksContainer}>
        <Link className={styles.siteLink} to="/properties">Properties</Link>
        <Link className={styles.siteLink} to="/services">Services</Link>
        <Link className={styles.siteLink} to="/aboutUs">AboutUs</Link>
        <Link className={styles.siteLink} to="/contact">Contact</Link>
      </section>
    </div>
  );
}

import styles from "./nav.module.css";

export default function Nav() {
  return <div className={styles.navContainer}>
    <section className={styles.siteLogoContainer}>
        <p className={styles.siteName}>Dream House</p>
    </section>
    <section className={styles.siteLinksContainer}>
        <p className={styles.siteLink}>Properties</p>
        <p className={styles.siteLink}>Services</p>
        <p className={styles.siteLink}>AboutUs</p>
        <p className={styles.siteLink}>Contact</p>
    </section>
  </div>;
}

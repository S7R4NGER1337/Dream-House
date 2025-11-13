import { useState } from "react";
import styles from "./nav.module.css";
import { Link, useLocation } from "react-router";

export default function Nav() {
  const location = useLocation().pathname;
  const [navStatus, setNavStatus] = useState(false);

  return (
    <>
      <div className={styles.navContainer}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <section className={styles.siteLogoContainer}>
            <img
              className={styles.siteLogo}
              src="/house-user-solid-full.svg"
              alt="siteLogo"
            />
            <p className={styles.siteName}>Dream House</p>
          </section>
        </Link>
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
              location === "/about-us" ? styles.selected : styles.siteLink
            }
            to="/about-us"
          >
            About Us
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
        <img
          className={styles.siteMobileMenuIcon}
          src="/bars-solid-full.svg"
          alt="menuLogo"
          onClick={() => setNavStatus((prev) => !prev)}
        />
      </div>
      {navStatus && (
        <section className={styles.siteLinksContainerMobile}>
          <Link
            className={location === "/" ? styles.selected : styles.siteLink}
            to="/"
            onClick={() => setNavStatus((prev) => !prev)}
          >
            Home
          </Link>
          <Link
            className={
              location === "/properties" ? styles.selected : styles.siteLink
            }
            to="/properties"
            onClick={() => setNavStatus((prev) => !prev)}
          >
            Properties
          </Link>
          <Link
            className={
              location === "/services" ? styles.selected : styles.siteLink
            }
            to="/services"
            onClick={() => setNavStatus((prev) => !prev)}
          >
            Services
          </Link>
          <Link
            className={
              location === "/about-us" ? styles.selected : styles.siteLink
            }
            to="/about-us"
            onClick={() => setNavStatus((prev) => !prev)}
          >
            About Us
          </Link>
          <Link
            className={
              location === "/contact" ? styles.selected : styles.siteLink
            }
            to="/contact"
            onClick={() => setNavStatus((prev) => !prev)}
          >
            Contact
          </Link>
        </section>
      )}
    </>
  );
}

import { useState } from "react";
import styles from "./nav.module.css";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact", path: "/contact" },
];

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
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={path}
              className={location === path ? styles.selected : styles.siteLink}
              to={path}
            >
              {name}
            </Link>
          ))}
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
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={path}
              className={location === path ? styles.selected : styles.siteLink}
              to={path}
              onClick={() => setNavStatus(false)}
            >
              {name}
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

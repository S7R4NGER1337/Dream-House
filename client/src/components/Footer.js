import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  const companyLinks = [
    { name: "About Us", link: "/about-us" },
    { name: "Careers", link: "/careers" },
    { name: "Contact", link: "/contact" },
    { name: "Blog", link: "/blog" },
  ];

  const serviceLinks = [
    { name: "Buy a Home", link: "/buy-home" },
    { name: "Sell a Home", link: "/sell-home" },
    { name: "Rent a Home", link: "/rent-home" },
    { name: "Mortgage", link: "/mortgage" },
  ];

  const legalLinks = [
    { name: "Terms of Use", link: "/terms" },
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Fair Housing", link: "/fair-housing" },
  ];

  const LinkColumn = ({ title, links }) => (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.link} className={styles.footerLink}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.logoColumn}>
            <div className={styles.logo}>
              <img
                src="/house-user-solid-full.svg"
                alt="siteLogo"
                className={styles.homeIcon}
              />
              <span className={styles.brandName}>Dream Homes</span>
            </div>
            <p className={styles.missionText}>
              Your key to finding the perfect home.
            </p>
          </div>

          <LinkColumn title="Company" links={companyLinks} />

          <LinkColumn title="Services" links={serviceLinks} />

          <LinkColumn title="Legal" links={legalLinks} />

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Follow Us</h3>
            <div className={styles.socialsContainer}>
              <img
                className={styles.social}
                src="/instagram-brands-solid-full.svg"
                alt="instagramIcon"
              />
              <img
                className={styles.social}
                src="/square-facebook-brands-solid-full.svg"
                alt="facebookIcon"
              />
            </div>
          </div>
        </div>

        <hr className={styles.separator} />

        <div className={styles.copyright}>
          <p>© 2025 Dream Homes. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

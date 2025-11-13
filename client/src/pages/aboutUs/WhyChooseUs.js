import WhyChooseUsCard from "./WhyChooseUsCard";
import styles from "./whyChooseUs.module.css";

const whyChooseUsData = [
  {
    id: 1,
    title: "Innovative Strategy",
    description:
      "We leverage data-driven insights and the latest technology to create targeted marketing plans for sellers and find hidden gems for buyers.",
    icon: "💡",
  },
  {
    id: 2,
    title: "Unwavering Commitment",
    description:
      "Your goals are our priority. We are your dedicated partners, offering transparent communication and expert advice every step of the way.",
    icon: "🤝",
  },
  {
    id: 3,
    title: "Proven Expertise",
    description:
      "Our team consists of top-tier agents with a track record of success and a deep understanding of the ever-changing real estate landscape.",
    icon: "🏆",
  },
];

const WhyChooseUs = () => {
  return (
    <div className={styles.whyUsContainer}>
      <h1 className={styles.whyUsTitle}>Why Choose Us?</h1>
      <p className={styles.whyUsSubtitle}>
        We offer a unique combination of technology, personalized service, and
        deep market expertise to give you a distinct advantage in your property
        search.
      </p>

      <div className={styles.whyUsGrid}>
        {whyChooseUsData.map((item) => (
          <WhyChooseUsCard key={item.id} cardData={item} />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;

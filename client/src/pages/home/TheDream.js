import styles from "./theDream.module.css";
import TheDreamExample from "./TheDreamExample";

export default function TheDream() {
  const dreamExamples = [
    {
      name: "Local Market Experts",
      iconPath: "/users-solid-full.svg",
      text: "Our agents possess deep local knowledge to guide you through every neighborhood nuance and market trend.",
    },
    {
      name: "Personalized Matching",
      iconPath: "/house-circle-check-solid-full.svg",
      text: "We listen to your needs and use advanced tools to find homes that are a perfect match for your lifestyle.",
    },
    {
      name: "Effortless Transactions",
      iconPath: "/gavel-solid-full.svg",
      text: "From first offer to final closing, we manage the complexities so you can focus on your new beginning.",
    },
  ];

  return (
    <div className={`${styles.theDreamContainer} ${styles.pageSection}`}>
      <h1 className={styles.theDreamTitle}>The Dream Homes Difference</h1>
      <p className={styles.theDreamSubtitle}>
        We blend cutting-edge technology with personalized, expert service to
        make your real estate experience seamless and successful.
      </p>
      <div className={styles.theDreamExamplesContainer}>
        {dreamExamples.map((example) => (
          <TheDreamExample dreamData={example} key={example.name} />
        ))}
      </div>
    </div>
  );
}

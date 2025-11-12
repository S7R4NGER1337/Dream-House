import styles from "./chooseUs.module.css";

export default function ChooseUs() {
  return (
    <div className={styles.chooseUsContiner}>
      <h1 className={styles.chooseUsTitle}>Why Choose Us?</h1>
      <p className={styles.chooseUsSubitle}>
        We offer a unique combination of technology, personalized service, and
        deep market expertise to give you a distinct advantage in your property
        search.
      </p>
    </div>
  );
}

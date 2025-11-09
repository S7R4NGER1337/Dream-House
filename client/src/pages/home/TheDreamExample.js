import styles from "./theDreamExample.module.css";

export default function TheDreamExample({ dreamData }) {
  return (
    <div className={styles.theDreamExampleContainer}>
      <img
        className={styles.theDreamExampleIcon}
        src={dreamData.iconPath}
        alt="dreamIcon"
      />
      <h1 className={styles.theDreamExampleName}>{dreamData.name}</h1>
      <p className={styles.theDreamExampleText}>{dreamData.text}</p>
    </div>
  );
}

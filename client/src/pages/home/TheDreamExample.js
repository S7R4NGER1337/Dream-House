import styles from "./theDreamExample.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function TheDreamExample({ dreamData, delay = 0 }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`${styles.theDreamExampleContainer} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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

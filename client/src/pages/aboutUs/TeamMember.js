import styles from "./teamMember.module.css";

export default function TeamMember({ memberData }) {
  return (
    <div className={styles.teamMemberContainer}>
      <img className={styles.teamMemberImage} src={memberData.image} alt="memberImage" />
      <h1 className={styles.teamMemberName}>{memberData.name}</h1>
      <p className={styles.teamMemberPosition}>{memberData.position}</p>
      <p className={styles.teamMemberDescription}>{memberData.description}</p>
    </div>
  );
}

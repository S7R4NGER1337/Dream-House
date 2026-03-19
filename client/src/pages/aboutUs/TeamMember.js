import styles from "./teamMember.module.css";

export default function TeamMember({ memberData }) {
  return (
    <div className={styles.teamMemberContainer}>
      <img className={styles.teamMemberImage} src={memberData.image} alt={memberData.name} />
      <h1 className={styles.teamMemberName}>{memberData.name}</h1>
      <p className={styles.teamMemberPosition}>{memberData.position}</p>
      <p className={styles.teamMemberDescription}>{memberData.description}</p>
      {(memberData.phone || memberData.email) && (
        <div className={styles.teamMemberContact}>
          {memberData.phone && (
            <a className={styles.contactLink} href={`tel:${memberData.phone}`}>
              📞 {memberData.phone}
            </a>
          )}
          {memberData.email && (
            <a className={styles.contactLink} href={`mailto:${memberData.email}`}>
              ✉️ {memberData.email}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

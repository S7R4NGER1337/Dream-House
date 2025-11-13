import TeamMember from './TeamMember';
import styles from './ourTeam.module.css'; 

const teamMembers = [
  {
    id: 1,
    name: 'Jane Doe',
    position: 'Founder & CEO',
    description: 'With over 20 years of experience, Jane leads with a vision to innovate the real estate industry and a deep commitment to client satisfaction.',
    image: 'https://i.imgur.com/h5T2vL1.png',
  },
  {
    id: 2,
    name: 'John Smith',
    position: 'Lead Broker',
    description: "John's unparalleled market knowledge and negotiation skills ensure our clients always get the best possible outcome.",
    image: 'https://i.imgur.com/W2R2G5A.png',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    position: 'Head of Client Relations',
    description: "Maria ensures every client's journey is seamless and positive, providing support and guidance from start to finish.",
    image: 'https://i.imgur.com/jW1j9tO.png',
  },
];

const OurTeam = () => {
  return (
    <div className={styles.ourTeamContainer}>
      <h1 className={styles.teamSectionTitle}>Meet Our Team</h1>
      <p className={styles.teamSectionSubtitle}>
        The driving force behind our success is our dedicated team of experienced professionals. Get to know the leaders committed to your real estate journey.
      </p>
      
      <div className={styles.teamGrid}>
        {teamMembers.map(member => (
          <TeamMember key={member.id} memberData={member} />
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
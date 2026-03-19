import styles from './contactAgent.module.css'

export default function ContactAgent() {
    return (
        <div className={styles.contactAgentContainer}>
            <h1 className={styles.contactAgentTitle}>Contact Agent</h1>
            <div className={styles.agentDataContainer}>
                <img className={styles.agentPhoto} src='/unnamed (6).png' alt='agentPhoto' />
                <section className={styles.agentInfo}>
                    <h3 className={styles.agentName}>Jane Doe</h3>
                    <p className={styles.agentAgency}>Dream Homes Realty</p>
                </section>
            </div>
            <div className={styles.formContainer}>
                <input className={styles.input} type='text' placeholder='Your Name' />
                <input className={styles.input} type='email' placeholder='Your Email' />
                <input className={styles.input} type='tel' placeholder='Your Phone (Optional)' />
                <textarea rows="5" className={styles.input} placeholder="I'm interested in this property..." />
                <button className={styles.sendInquiry}>Send Inquiry</button>
            </div>
        </div>
    )
}
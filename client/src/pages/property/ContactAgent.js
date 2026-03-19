import styles from './contactAgent.module.css'

export default function ContactAgent({ agent }) {
    return (
        <div className={styles.contactAgentContainer}>
            <h1 className={styles.contactAgentTitle}>Contact Agent</h1>

            <div className={styles.agentDataContainer}>
                <img
                    className={styles.agentPhoto}
                    src={agent?.photo || '/unnamed (6).png'}
                    alt={agent?.name || 'Agent'}
                />
                <section className={styles.agentInfo}>
                    <h3 className={styles.agentName}>{agent?.name || 'Dream Homes Realty'}</h3>
                    <p className={styles.agentPosition}>{agent?.position || ''}</p>
                    {agent?.phone && (
                        <a className={styles.agentContact} href={`tel:${agent.phone}`}>{agent.phone}</a>
                    )}
                    {agent?.email && (
                        <a className={styles.agentContact} href={`mailto:${agent.email}`}>{agent.email}</a>
                    )}
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

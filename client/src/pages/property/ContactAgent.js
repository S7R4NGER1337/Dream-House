import { useState } from 'react'
import styles from './contactAgent.module.css'

export default function ContactAgent({ agent }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        setSent(true)
    }

    return (
        <div className={styles.contactAgentContainer}>
            <h1 className={styles.contactAgentTitle}>Contact Agent</h1>

            <div className={styles.agentDataContainer}>
                <img
                    className={styles.agentPhoto}
                    src={agent?.photo || '/unnamed%20(6).png'}
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

            {sent ? (
                <div className={styles.successMsg}>
                    <span className={styles.successIcon}>✓</span>
                    <p>Message sent! The agent will contact you shortly.</p>
                </div>
            ) : (
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={styles.input}
                        type="tel"
                        name="phone"
                        placeholder="Your Phone (Optional)"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <textarea
                        rows="5"
                        className={styles.input}
                        name="message"
                        placeholder="I'm interested in this property..."
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                    <button className={styles.sendInquiry} type="submit">Send Inquiry</button>
                </form>
            )}
        </div>
    )
}

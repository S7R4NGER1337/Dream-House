import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './contactAgent.module.css'

export default function ContactAgent({ agent }) {
    const { id: propertyId } = useParams()
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, propertyId, agentId: agent?._id }),
            })
            const data = await res.json()
            if (!res.ok) { setError(data.error || 'Failed to send inquiry'); return }
            setSent(true)
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
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
                    {error && <p style={{ color: '#e53e3e', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{error}</p>}
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
                    <button className={styles.sendInquiry} type="submit" disabled={loading}>
                        {loading ? 'Sending…' : 'Send Inquiry'}
                    </button>
                </form>
            )}
        </div>
    )
}

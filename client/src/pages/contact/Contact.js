import { useState } from 'react'
import styles from './contact.module.css'

const INFO_ITEMS = [
  {
    icon: '📍',
    label: 'Office',
    value: '123 Real Estate Blvd, Suite 500\nSan Francisco, CA 94105',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+1 (415) 555-0100',
    href: 'tel:+14155550100',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'hello@dreamhomes.com',
    href: 'mailto:hello@dreamhomes.com',
  },
  {
    icon: '🕐',
    label: 'Hours',
    value: 'Mon – Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 4:00 PM',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Get In Touch</h1>
        <p className={styles.heroSubtitle}>
          Have a question or ready to start your real estate journey?<br />
          Our team is here to help — reach out anytime.
        </p>
      </div>

      <div className={styles.content}>

        {/* Form */}
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Send Us a Message</h2>

          {sent ? (
            <div className={styles.successMsg}>
              <span className={styles.successIcon}>✓</span>
              <p>Thank you! We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email *</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Phone</label>
                  <input
                    className={styles.input}
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Subject *</label>
                  <select
                    className={styles.input}
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="buying">Buying a Home</option>
                    <option value="selling">Selling a Home</option>
                    <option value="renting">Renting</option>
                    <option value="valuation">Property Valuation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Message *</label>
                <textarea
                  className={styles.input}
                  name="message"
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className={styles.submitBtn} type="submit">
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className={styles.infoCol}>
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Contact Information</h2>
            <div className={styles.infoList}>
              {INFO_ITEMS.map(item => (
                <div key={item.label} className={styles.infoItem}>
                  <span className={styles.infoIcon}>{item.icon}</span>
                  <div>
                    <p className={styles.infoLabel}>{item.label}</p>
                    {item.href ? (
                      <a className={styles.infoValue} href={item.href}>{item.value}</a>
                    ) : (
                      <p className={styles.infoValue}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.agentsCard}>
            <h2 className={styles.cardTitle}>Our Agents</h2>
            <div className={styles.agentList}>
              {[
                { name: 'Jane Doe', role: 'Founder & CEO', phone: '+1 (415) 555-0192', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80' },
                { name: 'John Smith', role: 'Lead Broker', phone: '+1 (512) 555-0347', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80&q=80' },
                { name: 'Maria Garcia', role: 'Head of Client Relations', phone: '+1 (305) 555-0218', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80&q=80' },
              ].map(agent => (
                <div key={agent.name} className={styles.agentRow}>
                  <img src={agent.photo} alt={agent.name} className={styles.agentPhoto} />
                  <div>
                    <p className={styles.agentName}>{agent.name}</p>
                    <p className={styles.agentRole}>{agent.role}</p>
                    <a className={styles.agentPhone} href={`tel:${agent.phone}`}>{agent.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import styles from './admin.module.css'
import { authHeader, jsonHeaders } from './adminAuth'

const EMPTY = { name: '', position: '', phone: '', email: '', photo: '' }

export default function AdminAgentForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isEdit) return
    const ac = new AbortController()
    fetch(`/api/admin/agents/${id}`, { headers: authHeader(), signal: ac.signal })
      .then(r => {
        if (r.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin'); return null }
        return r.json()
      })
      .then(a => {
        if (!a) return
        setForm({ name: a.name || '', position: a.position || '', phone: a.phone || '', email: a.email || '', photo: a.photo || '' })
      })
      .catch(() => {})
    return () => ac.abort()
  }, [id, isEdit, navigate])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    const body = {
      name: form.name.trim(),
      position: form.position.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      photo: form.photo.trim(),
    }
    try {
      const url = isEdit ? `/api/admin/agents/${id}` : '/api/admin/agents'
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: jsonHeaders(), body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed'); return }
      navigate('/admin/agents')
    } catch {
      setError('Server error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{isEdit ? 'Edit Agent' : 'Add Agent'}</h1>
        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => navigate('/admin/agents')}>← Back</button>
      </div>
      <div className={styles.card}>
        {error && <div className={styles.errorMsg}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name *</label>
              <input className={styles.input} value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Position *</label>
              <input className={styles.input} value={form.position} onChange={e => set('position', e.target.value)} required placeholder="e.g. Lead Broker" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input className={styles.input} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input className={styles.input} type="email" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className={`${styles.formGroup} ${styles.formFull}`}>
              <label className={styles.label}>Photo URL</label>
              <input className={styles.input} value={form.photo} onChange={e => set('photo', e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Agent'}
            </button>
            <button className={`${styles.btn} ${styles.btnGhost}`} type="button" onClick={() => navigate('/admin/agents')}>Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

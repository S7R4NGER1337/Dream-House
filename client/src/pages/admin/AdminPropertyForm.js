import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import styles from './admin.module.css'
import { authHeader, jsonHeaders } from './adminAuth'

const EMPTY = { name: '', price: '', location: '', description: '', beds: '', baths: '', sqft: '', build: '', coverImage: '', images: '', amenities: '', agent: '', status: 'true' }

export default function AdminPropertyForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const [form, setForm] = useState(EMPTY)
  const [agents, setAgents] = useState([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const ac = new AbortController()
    const { signal } = ac

    fetch('/api/admin/agents', { headers: authHeader(), signal })
      .then(r => r.json())
      .then(setAgents)
      .catch(() => {})

    if (isEdit) {
      fetch(`/api/admin/properties/${id}`, { headers: authHeader(), signal })
        .then(r => {
          if (r.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin'); return null }
          return r.json()
        })
        .then(p => {
          if (!p) return
          setForm({
            name: p.name || '',
            price: p.price || '',
            location: p.location || '',
            description: p.description || '',
            beds: p.beds || '',
            baths: p.baths || '',
            sqft: p.sqft || '',
            build: p.build || '',
            coverImage: p.coverImage || '',
            images: (p.images || []).join('\n'),
            amenities: (p.amenities || []).join('\n'),
            agent: p.agent?._id || p.agent || '',
            status: String(p.status ?? true),
          })
        })
        .catch(() => {})
    }

    return () => ac.abort()
  }, [id, isEdit, navigate])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    const body = {
      ...form,
      name: form.name.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      beds: Number(form.beds),
      baths: Number(form.baths),
      sqft: Number(form.sqft),
      build: Number(form.build),
      status: form.status === 'true',
      images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
      amenities: form.amenities.split('\n').map(s => s.trim()).filter(Boolean),
      agent: form.agent || undefined,
    }
    try {
      const url = isEdit ? `/api/admin/properties/${id}` : '/api/admin/properties'
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: jsonHeaders(), body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed'); return }
      navigate('/admin/properties')
    } catch {
      setError('Server error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{isEdit ? 'Edit Property' : 'Add Property'}</h1>
        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => navigate('/admin/properties')}>← Back</button>
      </div>
      <div className={styles.card}>
        {error && <div className={styles.errorMsg}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name *</label>
              <input className={styles.input} value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Price ($) *</label>
              <input className={styles.input} type="number" min="1" value={form.price} onChange={e => set('price', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Location *</label>
              <input className={styles.input} value={form.location} onChange={e => set('location', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Agent</label>
              <select className={`${styles.input} ${styles.select}`} value={form.agent} onChange={e => set('agent', e.target.value)}>
                <option value="">— None —</option>
                {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Beds</label>
              <input className={styles.input} type="number" min="0" value={form.beds} onChange={e => set('beds', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Baths</label>
              <input className={styles.input} type="number" min="0" value={form.baths} onChange={e => set('baths', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Sqft</label>
              <input className={styles.input} type="number" min="0" value={form.sqft} onChange={e => set('sqft', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Year Built</label>
              <input className={styles.input} type="number" min="1800" max="2100" value={form.build} onChange={e => set('build', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select className={`${styles.input} ${styles.select}`} value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="true">Active</option>
                <option value="false">Sold</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Cover Image URL</label>
              <input className={styles.input} value={form.coverImage} onChange={e => set('coverImage', e.target.value)} placeholder="https://..." />
            </div>
            <div className={`${styles.formGroup} ${styles.formFull}`}>
              <label className={styles.label}>All Image URLs (one per line)</label>
              <textarea className={`${styles.input} ${styles.textarea}`} value={form.images} onChange={e => set('images', e.target.value)} placeholder={'https://image1.jpg\nhttps://image2.jpg'} />
            </div>
            <div className={`${styles.formGroup} ${styles.formFull}`}>
              <label className={styles.label}>Amenities (one per line)</label>
              <textarea className={`${styles.input} ${styles.textarea}`} value={form.amenities} onChange={e => set('amenities', e.target.value)} placeholder={'Swimming Pool\nGarage\nGarden'} />
            </div>
            <div className={`${styles.formGroup} ${styles.formFull}`}>
              <label className={styles.label}>Description</label>
              <textarea className={`${styles.input} ${styles.textarea}`} style={{ minHeight: 120 }} value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Property'}
            </button>
            <button className={`${styles.btn} ${styles.btnGhost}`} type="button" onClick={() => navigate('/admin/properties')}>Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

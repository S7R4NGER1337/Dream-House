import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import styles from './admin.module.css'
import { authHeader } from './adminAuth'

export default function AdminProperties() {
  const [properties, setProperties] = useState([])
  const navigate = useNavigate()

  const load = useCallback(() => {
    fetch('/api/admin/properties', { headers: authHeader() })
      .then(r => {
        if (r.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin'); return null }
        return r.json()
      })
      .then(d => { if (d) setProperties(d) })
      .catch(() => {})
  }, [navigate])

  useEffect(() => { load() }, [load])

  const del = async (id) => {
    if (!window.confirm('Delete this property?')) return
    await fetch(`/api/admin/properties/${id}`, { method: 'DELETE', headers: authHeader() })
    load()
  }

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Properties</h1>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('/admin/properties/new')}>
          + Add Property
        </button>
      </div>
      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Location</th>
                <th>Price</th>
                <th>Beds</th>
                <th>Status</th>
                <th>Agent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => (
                <tr key={p._id}>
                  <td>
                    {p.coverImage && <img src={p.coverImage} alt="" className={styles.thumb} />}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.location}</td>
                  <td>${p.price?.toLocaleString()}</td>
                  <td>{p.beds}</td>
                  <td>
                    <span className={`${styles.badge} ${p.status ? styles.badgeGreen : styles.badgeRed}`}>
                      {p.status ? 'Active' : 'Sold'}
                    </span>
                  </td>
                  <td>{p.agent?.name || '—'}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => navigate(`/admin/properties/${p._id}/edit`)}>Edit</button>
                      <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => del(p._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No properties yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

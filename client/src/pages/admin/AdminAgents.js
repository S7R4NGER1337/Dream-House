import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import styles from './admin.module.css'
import { authOpts } from './adminAuth'

export default function AdminAgents() {
  const [agents, setAgents] = useState([])
  const navigate = useNavigate()

  const load = useCallback(() => {
    fetch('/api/admin/agents', authOpts())
      .then(r => {
        if (r.status === 401) { navigate('/admin'); return null }
        return r.json()
      })
      .then(d => { if (d) setAgents(d) })
      .catch(err => console.error(err))
  }, [navigate])

  useEffect(() => { load() }, [load])

  const del = async (id) => {
    if (!window.confirm('Delete this agent?')) return
    await fetch(`/api/admin/agents/${id}`, { method: 'DELETE', ...authOpts() })
    load()
  }

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Agents</h1>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('/admin/agents/new')}>
          + Add Agent
        </button>
      </div>
      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Position</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(a => (
                <tr key={a._id}>
                  <td>
                    {a.photo && <img src={a.photo} alt="" className={styles.agentThumb} />}
                  </td>
                  <td>{a.name}</td>
                  <td>{a.position}</td>
                  <td>{a.phone}</td>
                  <td>{a.email}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => navigate(`/admin/agents/${a._id}/edit`)}>Edit</button>
                      <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => del(a._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {agents.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No agents yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

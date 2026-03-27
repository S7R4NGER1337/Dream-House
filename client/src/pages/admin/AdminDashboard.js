import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import styles from './admin.module.css'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ac = new AbortController()
    fetch('/api/admin/stats', { credentials: 'include', signal: ac.signal })
      .then(r => {
        if (r.status === 401) { navigate('/admin'); return null }
        if (!r.ok) throw new Error('Failed to fetch stats')
        return r.json()
      })
      .then(d => { if (d) setStats(d) })
      .catch(err => { if (err.name !== 'AbortError') console.error(err) })

    return () => ac.abort()
  }, [navigate])

  const total    = stats?.properties ?? null
  const active   = stats?.active    ?? null
  const inactive = (total !== null && active !== null) ? total - active : null

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏠</div>
          <div className={styles.statLabel}>Total Properties</div>
          <div className={styles.statValue}>{total ?? '—'}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statLabel}>Active Listings</div>
          <div className={`${styles.statValue} ${styles.statGreen}`}>{active ?? '—'}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏸</div>
          <div className={styles.statLabel}>Inactive Listings</div>
          <div className={`${styles.statValue} ${styles.statRed}`}>{inactive ?? '—'}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👤</div>
          <div className={styles.statLabel}>Agents</div>
          <div className={styles.statValue}>{stats?.agents ?? '—'}</div>
        </div>
      </div>

      <div className={styles.dashboardRow}>
        {/* Recent properties */}
        <div className={`${styles.card} ${styles.dashboardCard}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Properties</h2>
            <Link to="/admin/properties" className={styles.cardLink}>View all →</Link>
          </div>
          <div className={styles.tableWrap}>
            {!stats ? (
              <p className={styles.loadingText}>Loading…</p>
            ) : !stats.recent?.length ? (
              <p className={styles.emptyText}>No properties found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map(p => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.location}</td>
                      <td>${Number(p.price).toLocaleString()}</td>
                      <td>
                        <span className={`${styles.badge} ${p.status ? styles.badgeGreen : styles.badgeRed}`}>
                          {p.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{p.agent?.name || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className={`${styles.card} ${styles.quickActions}`}>
          <h2 className={styles.cardTitle}>Quick Actions</h2>
          <div className={styles.quickList}>
            <Link to="/admin/properties/new" className={`${styles.btn} ${styles.btnPrimary} ${styles.quickBtn}`}>
              <span>＋</span> Add Property
            </Link>
            <Link to="/admin/agents/new" className={`${styles.btn} ${styles.btnPrimary} ${styles.quickBtn}`}>
              <span>＋</span> Add Agent
            </Link>
            <Link to="/admin/properties" className={`${styles.btn} ${styles.btnGhost} ${styles.quickBtn}`}>
              🏠 Manage Properties
            </Link>
            <Link to="/admin/agents" className={`${styles.btn} ${styles.btnGhost} ${styles.quickBtn}`}>
              👤 Manage Agents
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

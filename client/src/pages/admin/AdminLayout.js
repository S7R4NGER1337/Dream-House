import { NavLink, useNavigate } from 'react-router-dom'
import styles from './admin.module.css'

const LINKS = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/properties', icon: '🏠', label: 'Properties' },
  { to: '/admin/agents', icon: '👤', label: 'Agents' },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' }).catch(() => {})
    navigate('/admin')
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          🏡 <div><div>Dream House</div><span className={styles.sidebarLogoSub}>Admin Panel</span></div>
        </div>
        <nav className={styles.sidebarNav}>
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`
              }
            >
              <span className={styles.sidebarLinkIcon}>{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={logout}>Sign Out</button>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  )
}

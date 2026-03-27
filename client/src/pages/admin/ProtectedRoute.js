import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking') // 'checking' | 'ok' | 'denied'

  useEffect(() => {
    fetch('/api/admin/verify', { credentials: 'include' })
      .then(r => setStatus(r.ok ? 'ok' : 'denied'))
      .catch(() => setStatus('denied'))
  }, [])

  if (status === 'checking') {
    return <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Verifying session…</div>
  }
  if (status === 'denied') return <Navigate to="/admin" replace />
  return children
}

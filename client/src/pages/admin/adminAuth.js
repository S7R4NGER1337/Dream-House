export const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('adminToken')}` })
export const jsonHeaders = () => ({ ...authHeader(), 'Content-Type': 'application/json' })

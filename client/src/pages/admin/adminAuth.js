// All admin fetches use httpOnly cookie — no Authorization header needed.
export const authOpts = () => ({ credentials: 'include' })
export const jsonOpts = () => ({ credentials: 'include', headers: { 'Content-Type': 'application/json' } })

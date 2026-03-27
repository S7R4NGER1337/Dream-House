import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h2 style={{ color: '#1a202c', marginBottom: '0.5rem' }}>Something went wrong</h2>
          <p style={{ color: '#718096', marginBottom: '1.5rem' }}>Please refresh the page to try again.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{ padding: '0.6rem 1.5rem', background: '#004a7f', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

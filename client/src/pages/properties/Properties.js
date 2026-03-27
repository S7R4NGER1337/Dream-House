import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './properties.module.css'

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLine} style={{ width: '50%' }} />
        <div className={styles.skeletonLine} style={{ width: '70%' }} />
        <div className={styles.skeletonLine} style={{ width: '40%' }} />
        <div className={styles.skeletonLine} style={{ width: '60%', marginTop: '0.5rem' }} />
      </div>
    </div>
  )
}

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''
  const minBeds = searchParams.get('beds') ?? ''

  // Local input state so debounce doesn't lag the UI
  const [searchInput, setSearchInput] = useState(search)
  const debounceRef = useRef(null)

  const setParam = (key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      return next
    }, { replace: true })
  }

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchInput(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setParam('search', val), 300)
  }

  useEffect(() => {
    fetch('/property/getAll')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load properties')
        return res.json()
      })
      .then(data => setProperties(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = properties.filter(p => {
    const matchesSearch = !search ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase())
    const matchesPrice = !maxPrice || p.price <= Number(maxPrice)
    const matchesBeds = !minBeds || p.beds >= Number(minBeds)
    return matchesSearch && matchesPrice && matchesBeds
  })

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Properties</h1>
        <p className={styles.subtitle}>Browse our full collection of available homes</p>
      </div>

      <div className={styles.filters}>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="Search by city or name..."
          value={searchInput}
          onChange={handleSearchChange}
        />
        <select
          className={styles.filterInput}
          value={maxPrice}
          onChange={e => setParam('maxPrice', e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="1000000">Up to $1,000,000</option>
          <option value="1500000">Up to $1,500,000</option>
          <option value="2000000">Up to $2,000,000</option>
          <option value="3000000">Up to $3,000,000</option>
          <option value="5000000">Up to $5,000,000</option>
        </select>
        <select
          className={styles.filterInput}
          value={minBeds}
          onChange={e => setParam('beds', e.target.value)}
        >
          <option value="">Any Beds</option>
          <option value="1">1+ Beds</option>
          <option value="2">2+ Beds</option>
          <option value="3">3+ Beds</option>
          <option value="4">4+ Beds</option>
          <option value="5">5+ Beds</option>
        </select>
      </div>

      {error && <p className={styles.errorMsg}>{error}</p>}

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          {!error && filtered.length === 0 && (
            <p className={styles.statusMsg}>No properties match your filters.</p>
          )}
          <div className={styles.grid}>
            {filtered.map(property => (
              <div
                key={property._id}
                className={styles.card}
                onClick={() => navigate(`/property/${property._id}`)}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={property.coverImage}
                    alt={property.name}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <span className={styles.badge}>For Sale</span>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.price}>${property.price.toLocaleString('en-US')}</h2>
                  <p className={styles.name}>{property.name}</p>
                  <p className={styles.location}>{property.location}</p>
                  <div className={styles.details}>
                    <span>{property.beds} beds</span>
                    <span className={styles.dot}>·</span>
                    <span>{property.baths} baths</span>
                    <span className={styles.dot}>·</span>
                    <span>{property.sqft?.toLocaleString('en-US')} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

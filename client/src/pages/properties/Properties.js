import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './properties.module.css'

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minBeds, setMinBeds] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
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
    const matchesSearch = p.location.toLowerCase().includes(search.toLowerCase()) ||
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
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className={styles.filterInput}
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
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
          onChange={e => setMinBeds(e.target.value)}
        >
          <option value="">Any Beds</option>
          <option value="1">1+ Beds</option>
          <option value="2">2+ Beds</option>
          <option value="3">3+ Beds</option>
          <option value="4">4+ Beds</option>
          <option value="5">5+ Beds</option>
        </select>
      </div>

      {loading && <p className={styles.statusMsg}>Loading properties...</p>}
      {error && <p className={styles.errorMsg}>{error}</p>}

      {!loading && !error && filtered.length === 0 && (
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
    </div>
  )
}

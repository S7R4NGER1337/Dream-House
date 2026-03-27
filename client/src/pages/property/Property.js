import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactAgent from './ContactAgent';
import HomeDetails from './HomeDetails';
import styles from './property.module.css';

const SWIPE_THRESHOLD = 50

export default function Property() {
    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lightboxIndex, setLightboxIndex] = useState(null)

    const touchStartX = useRef(null)
    const dragRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`/property/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Property not found')
                return res.json()
            })
            .then(data => setProperty(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    const changeSlide = (dir) => {
        setLightboxIndex(i => (i + dir + property.images.length) % property.images.length)
    }

    useEffect(() => {
        if (lightboxIndex === null) return
        const onKey = (e) => {
            if (e.key === 'Escape') setLightboxIndex(null)
            if (e.key === 'ArrowRight') changeSlide(1)
            if (e.key === 'ArrowLeft') changeSlide(-1)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lightboxIndex, property])

    const slideOut = (dir, callback) => {
        const el = dragRef.current
        if (!el) { callback(); return }
        el.style.transition = 'transform 220ms ease'
        el.style.transform = `translateX(${dir * -110}%)`
        setTimeout(() => {
            el.style.transition = 'none'
            el.style.transform = 'translateX(0)'
            callback()
            // re-enable transition after reset
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (el) el.style.transition = ''
                })
            })
        }, 220)
    }

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
        if (dragRef.current) {
            dragRef.current.style.transition = 'none'
        }
    }

    const onTouchMove = (e) => {
        if (touchStartX.current === null) return
        const delta = e.touches[0].clientX - touchStartX.current
        if (dragRef.current) {
            dragRef.current.style.transform = `translateX(${delta}px)`
        }
    }

    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        touchStartX.current = null

        if (Math.abs(delta) > SWIPE_THRESHOLD) {
            const dir = delta < 0 ? 1 : -1
            slideOut(dir, () => changeSlide(dir))
        } else {
            // snap back
            if (dragRef.current) {
                dragRef.current.style.transition = 'transform 200ms ease'
                dragRef.current.style.transform = 'translateX(0)'
            }
        }
    }

    if (loading) return <p style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>Loading…</p>
    if (error) return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ color: '#e53e3e', marginBottom: '1rem' }}>{error}</p>
            <a href="/properties" style={{ color: '#004a7f', fontWeight: 600 }}>← Back to Properties</a>
        </div>
    )
    if (!property) return null

    const mortgage = Math.round((property.price * 0.006)).toLocaleString('en-US')

    return (
        <>
            <div className={styles.propertyContainer}>
                <div className={styles.nameAndPriceContainer}>
                    <section className={styles.nameAndStreet}>
                        <h1 className={styles.houseName}>{property.name}</h1>
                        <p className={styles.houseStreet}>{property.location}</p>
                    </section>
                    <section className={styles.housePriceContainer}>
                        <h1 className={styles.housePrice}>${property.price.toLocaleString('en-US')}</h1>
                        <p className={styles.houseMortgage}>Est. Mortgage: ${mortgage}/mo</p>
                    </section>
                </div>

                {/* Desktop grid */}
                <div className={styles.photosGrid}>
                    {property.images.slice(0, 4).map((img, i) => (
                        <div
                            key={i}
                            className={`${styles.photoWrapper} ${i === 0 ? styles.mainPhoto : ''}`}
                            onClick={() => setLightboxIndex(i)}
                        >
                            <img src={img} alt={`${property.name} ${i + 1}`} loading={i > 0 ? 'lazy' : 'eager'} />
                        </div>
                    ))}
                    {property.images.length > 4 && (
                        <div className={`${styles.photoWrapper} ${styles.lastPhoto}`} onClick={() => setLightboxIndex(4)}>
                            <img src={property.images[4]} alt={`${property.name} 5`} loading="lazy" />
                            <button className={styles.showAllBtn} onClick={(e) => { e.stopPropagation(); setLightboxIndex(0) }}>
                                <span>⠿</span> Show all photos
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile hero */}
                <div className={styles.mobileHero} onClick={() => setLightboxIndex(0)}>
                    <img src={property.images[0]} alt={property.name} className={styles.mobileHeroImg} />
                    <button className={styles.mobileShowAllBtn} onClick={(e) => { e.stopPropagation(); setLightboxIndex(0) }}>
                        ⠿ {property.images.length} photos
                    </button>
                </div>
            </div>

            <div className={styles.homeDataContainer}>
                <HomeDetails property={property} />
                <ContactAgent agent={property.agent} />
            </div>

            {lightboxIndex !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Photo ${lightboxIndex + 1} of ${property.images.length}`}
                    className={styles.lightboxOverlay}
                    onClick={() => setLightboxIndex(null)}
                >
                    <button className={styles.lightboxClose} onClick={() => setLightboxIndex(null)}>✕</button>

                    <button
                        className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
                        onClick={(e) => { e.stopPropagation(); changeSlide(-1) }}
                    >‹</button>

                    <div
                        className={styles.lightboxContent}
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div ref={dragRef} className={styles.lightboxImgWrapper}>
                            <img
                                src={property.images[lightboxIndex]}
                                alt={`${property.name} ${lightboxIndex + 1}`}
                                className={styles.lightboxImg}
                                draggable={false}
                            />
                        </div>
                        <p className={styles.lightboxCounter}>{lightboxIndex + 1} / {property.images.length}</p>
                    </div>

                    <button
                        className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
                        onClick={(e) => { e.stopPropagation(); changeSlide(1) }}
                    >›</button>

                    <div className={styles.lightboxThumbs} onClick={(e) => e.stopPropagation()}>
                        {property.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`thumb ${i + 1}`}
                                className={`${styles.lightboxThumb} ${i === lightboxIndex ? styles.lightboxThumbActive : ''}`}
                                onClick={() => setLightboxIndex(i)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

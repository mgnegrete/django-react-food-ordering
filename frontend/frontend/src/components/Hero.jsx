import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config'
import { PreOrderModal } from './PreOrderModal'

const getTimeLeft = (target) => {
  const diff = new Date(target) - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export const Hero = () => {
  const [drop, setDrop] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE_URL}/drops/active/`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setDrop(data)
        setTimeLeft(getTimeLeft(data.date))
      })
      .catch(() => setDrop(null))
  }, [])

  useEffect(() => {
    if (!drop) return
    const timer = setInterval(() => setTimeLeft(getTimeLeft(drop.date)), 1000)
    return () => clearInterval(timer)
  }, [drop])

  const dropLabel = drop
    ? new Date(drop.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <>
      <div className="hero-container d-flex flex-column align-items-center justify-content-center text-center px-3">
        <h1 className="display-3 fw-bold mb-2">Casa Puchica</h1>
        <p className="lead mb-5">Fresh pupusas, straight from San Miguel, El Salvador</p>

        {drop ? (
          <>
            <p className="text-uppercase fw-semibold drop-label mb-1">Next Drop</p>
            <p className="text-muted mb-4">{dropLabel}</p>

            <div className="d-flex gap-4 mb-5">
              {[['Days', timeLeft?.days], ['Hours', timeLeft?.hours], ['Minutes', timeLeft?.minutes], ['Seconds', timeLeft?.seconds]].map(([label, value]) => (
                <div key={label} className="countdown-block">
                  <div className="countdown-number">{String(value ?? 0).padStart(2, '0')}</div>
                  <div className="countdown-label">{label}</div>
                </div>
              ))}
            </div>

            <button className="btn btn-custom-primary btn-lg px-5" onClick={() => setShowModal(true)}>
              Pre-Order Now
            </button>
          </>
        ) : (
          <p className="text-muted">No upcoming drop scheduled yet. Check back soon!</p>
        )}
      </div>

      {showModal && <PreOrderModal onClose={() => setShowModal(false)} />}
    </>
  )
}

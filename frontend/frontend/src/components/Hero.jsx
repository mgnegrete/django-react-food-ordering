import React, { useState, useEffect } from 'react'

const NEXT_DROP_DATE = new Date('2026-06-07T10:00:00')

const getTimeLeft = (target) => {
  const diff = target - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const dropLabel = NEXT_DROP_DATE.toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const dropShort = NEXT_DROP_DATE.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(NEXT_DROP_DATE))
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', quantity: 1, notes: '' })

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(NEXT_DROP_DATE)), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to backend
    setSubmitted(true)
  }

  const handleClose = () => {
    setShowModal(false)
    setSubmitted(false)
    setForm({ name: '', email: '', quantity: 1, notes: '' })
  }

  return (
    <>
      <div className="hero-container d-flex flex-column align-items-center justify-content-center text-center px-3">
        <h1 className="display-3 fw-bold mb-2">Casa Puchica</h1>
        <p className="lead mb-5">Fresh pupusas, straight from San Miguel, El Salvador</p>

        <p className="text-uppercase fw-semibold drop-label mb-1">Next Drop</p>
        <p className="text-muted mb-4">{dropLabel}</p>

        <div className="d-flex gap-4 mb-5">
          {[['Days', timeLeft.days], ['Hours', timeLeft.hours], ['Minutes', timeLeft.minutes], ['Seconds', timeLeft.seconds]].map(([label, value]) => (
            <div key={label} className="countdown-block">
              <div className="countdown-number">{String(value).padStart(2, '0')}</div>
              <div className="countdown-label">{label}</div>
            </div>
          ))}
        </div>

        <button className="btn btn-custom-primary btn-lg px-5" onClick={() => setShowModal(true)}>
          Pre-Order Now
        </button>
      </div>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pre-Order — {dropShort}</h5>
                <button type="button" className="btn-close" onClick={handleClose} />
              </div>
              <div className="modal-body">
                {submitted ? (
                  <div className="text-center py-4">
                    <i className="bi bi-check-circle text-success fs-1" />
                    <h5 className="mt-3">You're on the list!</h5>
                    <p className="text-muted">We'll reach out with pickup details closer to the drop date.</p>
                    <button className="btn btn-outline-secondary mt-2" onClick={handleClose}>Close</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Name</label>
                      <input
                        className="form-control"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">How many pupusas?</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        required
                        value={form.quantity}
                        onChange={e => setForm({ ...form, quantity: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Notes / Filling Preferences</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="e.g. bean & cheese, revueltas, cheese only..."
                        value={form.notes}
                        onChange={e => setForm({ ...form, notes: e.target.value })}
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-custom-primary btn-lg">Submit Pre-Order</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

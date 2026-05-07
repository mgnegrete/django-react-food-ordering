import React, { useState, useEffect } from 'react'

const NEXT_DROP_DATE = new Date('2026-06-07T10:00:00')

const FILLINGS = [
  { key: 'revueltas', label: 'Revueltas' },
  { key: 'queso', label: 'Queso' },
  { key: 'quesoFrijol', label: 'Queso y Frijol' },
  { key: 'loroco', label: 'Loroco' },
]

const EMPTY_FILLINGS = { revueltas: 0, queso: 0, quesoFrijol: 0, loroco: 0 }

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
  const [form, setForm] = useState({ name: '', email: '', phone: '', fillings: EMPTY_FILLINGS, notes: '' })

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(NEXT_DROP_DATE)), 1000)
    return () => clearInterval(timer)
  }, [])

  const total = Object.values(form.fillings).reduce((sum, n) => sum + Number(n), 0)

  const handleHotkey = (key, qty) => {
    setForm({ ...form, fillings: { ...form.fillings, [key]: qty } })
  }

  const handleFilling = (key, value) => {
    const n = Math.max(0, Number(value) || 0)
    setForm({ ...form, fillings: { ...form.fillings, [key]: n } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to backend
    setSubmitted(true)
  }

  const handleClose = () => {
    setShowModal(false)
    setSubmitted(false)
    setForm({ name: '', email: '', phone: '', fillings: EMPTY_FILLINGS, notes: '' })
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
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="(805) 555-1234"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label fw-semibold">Order</label>
                      <table className="table table-sm align-middle mb-1">
                        <thead>
                          <tr>
                            <th className="text-muted fw-normal">Filling</th>
                            <th className="text-muted fw-normal text-center">Qty</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {FILLINGS.map(({ key, label }) => (
                            <tr key={key}>
                              <td>{label}</td>
                              <td style={{ width: '80px' }}>
                                <input
                                  type="number"
                                  className="form-control form-control-sm text-center"
                                  min="0"
                                  value={form.fillings[key]}
                                  onChange={e => handleFilling(key, e.target.value)}
                                />
                              </td>
                              <td>
                                <div className="d-flex gap-1 justify-content-end">
                                  {[6, 12, 24].map(qty => (
                                    <button
                                      key={qty}
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                      onClick={() => handleHotkey(key, qty)}
                                    >
                                      {qty}
                                    </button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td className="fw-semibold">Total</td>
                            <td className="fw-semibold text-center">{total}</td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Notes</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Allergies, pickup instructions, anything else..."
                        value={form.notes}
                        onChange={e => setForm({ ...form, notes: e.target.value })}
                      />
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-custom-primary btn-lg"
                        disabled={total === 0}
                      >
                        Submit Pre-Order
                      </button>
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

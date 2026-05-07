import { useState, useEffect } from 'react'
import { NEXT_DROP_DATE, FILLINGS, EMPTY_FILLINGS } from '../config'

const EMPTY_FORM = { name: '', email: '', phone: '', fillings: EMPTY_FILLINGS, notes: '' }

const dropShort = NEXT_DROP_DATE.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

export const PreOrderModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const total = Object.values(form.fillings).reduce((sum, n) => sum + Number(n), 0)

  const handleHotkey = (key, qty) =>
    setForm({ ...form, fillings: { ...form.fillings, [key]: qty } })

  const handleFilling = (key, value) => {
    const n = Math.max(0, Number(value) || 0)
    setForm({ ...form, fillings: { ...form.fillings, [key]: n } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to backend
    setSubmitted(true)
  }

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pre-Order — {dropShort}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            {submitted ? (
              <div className="text-center py-4">
                <i className="bi bi-check-circle text-success fs-1" />
                <h5 className="mt-3">You're on the list!</h5>
                <p className="text-muted">We'll reach out with pickup details closer to the drop date.</p>
                <button className="btn btn-outline-secondary mt-2" onClick={onClose}>Close</button>
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
  )
}

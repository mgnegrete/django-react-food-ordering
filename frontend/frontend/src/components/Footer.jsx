import { INSTAGRAM } from '../config'

const Footer = () => (
  <footer className="footer-bar border-top border-dark py-3 px-4 px-md-5 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
    <span className="text-muted small">© 2026 De la Nana · 805</span>
    <div className="d-flex gap-3 align-items-center">
      <a
        href={`https://instagram.com/${INSTAGRAM}`}
        target="_blank"
        rel="noreferrer"
        className="footer-link text-decoration-none"
      >
        <i className="bi bi-instagram me-1" />
        @{INSTAGRAM}
      </a>
    </div>
  </footer>
)

export default Footer

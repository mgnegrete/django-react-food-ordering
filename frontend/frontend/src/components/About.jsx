import { Link } from 'react-router-dom'

export const About = () => {
  return (
    <div className="page-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <h1 className="display-5 fw-bold mb-4">About De la Nana</h1>

            <p className="lead mb-4">
              De la Nana is a pop-up kitchen bringing authentic Salvadoran pupusas to the 805.
              Every pupusa is made by hand, from scratch, using recipes passed down straight from
              San Miguel, El Salvador.
            </p>

            <p className="mb-4">
              &ldquo;Nana&rdquo; is what we call grandma — and that&apos;s exactly where these recipes come from.
              Made by hand, passed down through generations, the same way it&apos;s always been done
              in San Miguel.
            </p>

            <p className="mb-4">
              We sell in limited monthly drops because we believe food made with care shouldn&apos;t
              be rushed. Each drop is a chance to get something real — no shortcuts, no freezers,
              just fresh masa and good fillings.
            </p>

            <h4 className="fw-bold mt-5 mb-3">Our Fillings</h4>
            <ul className="list-unstyled mb-4">
              <li className="mb-2"><strong>Revueltas</strong> — ground pork, beans, and cheese</li>
              <li className="mb-2"><strong>Queso</strong> — simple, classic cheese</li>
              <li className="mb-2"><strong>Queso y Frijol</strong> — cheese and refried beans</li>
              <li className="mb-2"><strong>Loroco</strong> — cheese with loroco flower, a Salvadoran staple</li>
            </ul>

            <div className="mt-5 pt-4 border-top">
              <p className="fw-semibold mb-3">Ready to pre-order?</p>
              <Link to="/" className="btn btn-custom-primary px-5">See the Next Drop</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

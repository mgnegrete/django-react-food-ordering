const FAQS = [
  {
    q: 'How do I order?',
    a: 'Click the Pre-Order Now button on the homepage when a drop is active. Fill in your name, phone number, email, and how many of each filling you want. You\'ll get a text confirmation right away.',
  },
  {
    q: 'When and where is pickup?',
    a: 'We\'ll text you pickup location and time details closer to the drop date. Make sure your phone number is correct when you order.',
  },
  {
    q: 'How much do pupusas cost?',
    a: 'Pricing is announced with each drop. Follow us for updates.',
  },
  {
    q: 'Are your pupusas gluten-free?',
    a: 'Yes — pupusas are made with masa (corn dough), which is naturally gluten-free. If you have a severe allergy, reach out to us directly.',
  },
  {
    q: 'What fillings do you offer?',
    a: 'We offer Revueltas (ground pork, beans, cheese), Queso, Queso y Frijol, and Loroco. All are made fresh for each drop.',
  },
  {
    q: 'How often do you do drops?',
    a: 'Roughly once a month. The countdown on the homepage always shows the next scheduled drop.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Text us as soon as possible if you need to make a change. We\'ll do our best to accommodate, but orders may be locked closer to the drop date.',
  },
  {
    q: 'Do you cater or do custom orders?',
    a: 'We\'re open to it — reach out to us directly to talk through what you need.',
  },
]

export const FAQ = () => {
  return (
    <div className="page-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <h1 className="display-5 fw-bold mb-5">Frequently Asked Questions</h1>
            <div className="accordion" id="faqAccordion">
              {FAQS.map((item, i) => (
                <div className="accordion-item border-0 border-bottom" key={i}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed px-0 fw-semibold"
                      style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${i}`}
                    >
                      {item.q}
                    </button>
                  </h2>
                  <div id={`faq-${i}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body px-0 text-muted">
                      {item.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

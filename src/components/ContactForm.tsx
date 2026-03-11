'use client';

export function ContactForm() {
  return (
    <form className="card" style={{ padding: '1.5rem' }} id="contact-form">
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">Meno</label>
        <input type="text" id="contact-name" className="form-input" placeholder="Vaše meno" />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-email">E-mail</label>
        <input type="email" id="contact-email" className="form-input" placeholder="vas@email.sk" />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">Správa</label>
        <textarea id="contact-message" className="form-textarea" placeholder="Vaša správa..." rows={5}></textarea>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        id="contact-submit"
        onClick={() => alert('Ďakujeme za správu! Ozveme sa vám čo najskôr.')}
      >
        Odoslať správu
      </button>
    </form>
  );
}

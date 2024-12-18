import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ fname: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!formData.fname.trim()) {
      errors.fname = 'Name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    }

    return errors;
  };

  const SendEmail = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ fname: '', email: '', message: '' }); 
    }
  };

  return (
    <>
      <h2 className="contact-text">Contact</h2>
      <section>
        <form onSubmit={SendEmail}>
          <div>
            <label htmlFor="fname">
              <span>Name <span className="required-star">*</span></span>
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              placeholder="Enter your name.."
            />
            {errors.fname && <p className="error-message">{errors.fname}</p>}
          </div>

          <div>
            <label htmlFor="email">
              <span>Email <span className="required-star">*</span></span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address.."
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message">
              <span>Message</span>
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              cols="30"
              rows="10"
              placeholder="Enter your message.."
            ></textarea>
            {errors.message && <p className="error-message">{errors.message}</p>}
          </div>

          <button className="button-54" type="submit">
            Submit
          </button>
          {isSubmitted && <p className="success-message">Your message has been sent successfully!</p>}
        </form>
      </section>
    </>
  );
}

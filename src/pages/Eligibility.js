import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';  // Assuming Main is your primary layout component

const Eligibility = () => {
  const [formResponse, setFormResponse] = useState('');
  const [formData, setFormData] = useState({ phoneNumber: '', message: '' });

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { phoneNumber, message } = formData;

    // Make POST request to the server for sending the SMS
    try {
      const response = await fetch('http://localhost:3005/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      });
      const result = await response.text();
      setFormResponse(result);
    } catch (error) {
      setFormResponse('Error sending message.');
    }
  };

  // Updates form data based on input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Main title="Eligibility" description="Check your eligibility and send a message">
      <article className="post" id="eligibility">
        <header>
          <div className="title">
            <h2>
              <Link to="/eligibility">Eligibility Check</Link>
            </h2>
            <p>Enter your details to check eligibility and send a message</p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+1234567890"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Hello from Link Heatlh"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit">Send Message</button>
        </form>

        {formResponse && <p>{formResponse}</p>}
      </article>
    </Main>
  );
};

export default Eligibility;

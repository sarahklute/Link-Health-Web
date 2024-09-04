require('dotenv').config({ path: './twilio.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To handle form submissions

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.error('Twilio credentials are missing');
  process.exit(1);
}

const client = new twilio(accountSid, authToken);

// Serve the HTML form on the root path
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Send a Text Message</h1>
        <form action="/send-sms" method="POST">
          <label for="phoneNumber">Phone Number:</label><br>
          <input type="text" id="phoneNumber" name="phoneNumber" placeholder="+1234567890" required><br><br>
          
          <label for="message">Message:</label><br>
          <textarea id="message" name="message" placeholder="Hello from Link Health" required></textarea><br><br>
          
          <button type="submit">Send Message</button>
        </form>
      </body>
    </html>
  `);
});

// Define the /send-sms POST route to handle form submissions
app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).send({ success: false, error: 'Phone number and message are required.' });
  }

  client.messages
    .create({
      body: message,
      to: phoneNumber, // The user's phone number
      from: '+18668061186', // Your Twilio number
    })
    .then((message) => {
      console.log(`Message sent with SID: ${message.sid}`);
      res.send(`
        <html>
          <body>
            <h1>Message Sent Successfully! here </h1>
            <p>Message SID: ${message.sid}</p>
            <a href="/">Send Another Message</a>
          </body>
        </html>
      `);
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).send(`
        <html>
          <body>
            <h1>Error Sending Message</h1>
            <p>${error.message}</p>
            <a href="/">Try Again</a>
          </body>
        </html>
      `);
    });
});

// Start the server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendConfirmationEmail = async (email, studentName, eventTitle, eventDate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Event Registration Confirmation",
      html: `
        <p>Hello <strong>${studentName}</strong>,</p>
        <p>You have successfully registered for the event:</p>
        <h2>${eventTitle}</h2>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p>Thank you for registering!</p>
        <p><strong>Campus Connect Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Confirmation email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendConfirmationEmail;
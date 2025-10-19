// utils/email.js
const nodemailer = require('nodemailer');

async function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  }

  // Fallback to Ethereal (test only) if SMTP not configured
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: { user: testAccount.user, pass: testAccount.pass }
  });
}

async function sendResetEmail(toEmail, resetUrl) {
  const transporter = await createTransporter();
  const message = {
    from: `"Expense Tracker Pro" <${process.env.SMTP_USER || 'no-reply@example.com'}>`,
    to: toEmail,
    subject: 'Password Reset - Expense Tracker Pro',
    text: `Reset your password using this link: ${resetUrl}`,
    html: `<p>Reset your password by clicking <a href="${resetUrl}">this link</a>.</p>`
  };

  const info = await transporter.sendMail(message);

  // If using Ethereal, print preview URL
  if (nodemailer.getTestMessageUrl(info)) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

module.exports = sendResetEmail;

const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

async function sendVerificationEmail(email, token) {
  const t = getTransporter();
  if (!t) {
    console.log(`[Email] Verification link for ${email}: ${process.env.APP_URL || 'http://localhost:3000'}/api/auth/verify/${token}`);
    return;
  }
  const url = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/verify/${token}`;
  await t.sendMail({
    from: process.env.SMTP_USER || 'noreply@procoach.ai',
    to: email,
    subject: 'ProCoach AI - Verify Your Email',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px">
        <h2 style="color:#6e57e0">ProCoach AI</h2>
        <p>Welcome! Click the button below to verify your email address:</p>
        <a href="${url}" style="display:inline-block;padding:12px 24px;background:#6e57e0;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">Verify Email</a>
        <p style="color:#888;font-size:14px;margin-top:20px">If you didn't create an account, you can ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendVerificationEmail };

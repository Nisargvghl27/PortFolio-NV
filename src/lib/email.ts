import nodemailer from 'nodemailer'

// ─── Gmail SMTP transporter ──────────────────────────────────────────────────
// Requires GMAIL_USER and GMAIL_APP_PASSWORD in .env
function getGmailTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error('GMAIL_USER or GMAIL_APP_PASSWORD is not set in environment variables.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

// ─── Notification: User → You (via Gmail SMTP) ───────────────────────────────
export async function sendNotificationEmail({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  try {
    const transporter = getGmailTransporter()

    await transporter.sendMail({
      from: `"Portfolio System" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: email, // If you click reply in Gmail, it goes to the user
      subject: `New Transmission from: ${name}`,
      text: `> NEW CONNECTION ESTABLISHED\n\nNAME: ${name}\nEMAIL: ${email}\n\nMESSAGE:\n${message}`,
    })
  } catch (error) {
    console.error('Failed to send notification email:', error)
  }
}

// ─── Reply: You → User (via Gmail SMTP) ──────────────────────────────────────
export async function sendReplyEmail({
  to,
  toName,
  subject,
  replyBody,
}: {
  to: string
  toName: string
  subject: string
  replyBody: string
}) {
  const transporter = getGmailTransporter()

  await transporter.sendMail({
    from: `"Nisarg Vaghela" <${process.env.GMAIL_USER}>`,
    to: `"${toName}" <${to}>`,
    replyTo: process.env.GMAIL_USER, // User can reply back to your Gmail
    subject,
    text: replyBody,
  })
}
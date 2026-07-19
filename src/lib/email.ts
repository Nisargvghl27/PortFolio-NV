// import { Resend } from 'resend'

// // Initialize Resend with your API key
// const resend = new Resend(process.env.RESEND_API_KEY)

// export async function sendNotificationEmail({ name, email, message }: { name: string, email: string, message: string }) {
//   if (!process.env.RESEND_API_KEY) {
//     console.warn('RESEND_API_KEY is not set. Skipping notification email.')
//     return
//   }
  
//   try {
//     await resend.emails.send({
//       from: 'Portfolio System <onboarding@resend.dev>', // Use a verified domain in production if you have one
//       to: ['nisargvaghela103@gmail.com'],
//       subject: `New Transmission from: ${name}`,
//       text: `> NEW CONNECTION ESTABLISHED\n\nNAME: ${name}\nEMAIL: ${email}\n\nMESSAGE:\n${message}`,
//     })
//   } catch (error) {
//     console.error('Failed to send notification email:', error)
//   }
// }

// export async function sendReplyEmail({ to, subject, replyBody }: { to: string, subject: string, replyBody: string }) {
//   if (!process.env.RESEND_API_KEY) {
//     throw new Error('RESEND_API_KEY is not set. Cannot send reply.')
//   }

//   try {
//     await resend.emails.send({
//       from: 'Nisarg Vaghela <onboarding@resend.dev>', // Ensure you use a verified domain in production
//       to: [to],
//       subject: subject,
//       text: replyBody,
//     })
//   } catch (error) {
//     console.error('Failed to send reply email:', error)
//     throw error
//   }
// }

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNotificationEmail({ name, email, message }: { name: string, email: string, message: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Skipping notification email.')
    return
  }

  try {
    await resend.emails.send({
      from: 'Portfolio System <onboarding@resend.dev>', // Use your verified domain
      to: ['nisargvaghela103@gmail.com'],
      replyTo: email, // This allows direct replies to the user
      subject: `New Transmission from: ${name}`,
      text: `> NEW CONNECTION ESTABLISHED\n\nNAME: ${name}\nEMAIL: ${email}\n\nMESSAGE:\n${message}`,
    })
  } catch (error) {
    console.error('Failed to send notification email:', error)
  }
}

export async function sendReplyEmail({ to, subject, replyBody }: { to: string, subject: string, replyBody: string }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set. Cannot send reply.')
  }

  try {
    await resend.emails.send({
      from: 'Nisarg Vaghela <onboarding@resend.dev>', // Use your verified domain
      to: [to],
      replyTo: 'nisargvaghela103@gmail.com', // So the user can reply back to your gmail
      subject: subject,
      text: replyBody,
    })
  } catch (error) {
    console.error('Failed to send reply email:', error)
    throw error
  }
}
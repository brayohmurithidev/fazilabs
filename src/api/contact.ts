import nodemailer from 'nodemailer';
import type { Request, Response } from 'express';

// Create a transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: '7a3008001@smtp-brevo.com',
    pass: import.meta.env.VITE_BREVO_SMTP_PASSWORD,
  },
});

export async function POST(req: Request, res: Response) {
  try {
    const { name, email, message, service } = await req.json();

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Email content for admin
    const mailOptions = {
      from: '7a3008001@smtp-brevo.com',
      to: 'info@fazilabs.com',
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0034EF; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
          </div>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px;">
            <p style="margin: 5px 0;"><strong>Message:</strong></p>
            <p style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    // Send email to admin
    await transporter.sendMail(mailOptions);

    // Confirmation email to user
    const confirmationMailOptions = {
      from: '7a3008001@smtp-brevo.com',
      to: email,
      subject: 'Thank you for contacting Fazilabs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0034EF; margin-bottom: 20px;">Thank you for reaching out!</h2>
          <p style="margin-bottom: 15px;">Dear ${name},</p>
          <p style="margin-bottom: 15px;">Thank you for contacting Fazilabs. We have received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
            <p style="margin: 5px 0;"><strong>Message:</strong></p>
            <p style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-bottom: 5px;">Best regards,</p>
          <p style="margin-top: 0; color: #0034EF; font-weight: bold;">Fazilabs Team</p>
        </div>
      `,
    };

    // Send confirmation email
    await transporter.sendMail(confirmationMailOptions);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
} 
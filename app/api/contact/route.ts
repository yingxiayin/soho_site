import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, whatsapp, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter for Tencent Enterprise Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.exmail.qq.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Map subject codes to readable labels
    const mailSubjectMap: Record<string, string> = {
      'wholesale-quote': 'Wholesale Quote Request',
      'oem-inquiry': 'OEM & Custom Manufacturing',
      'private-label': 'Private Label Inquiry',
      'product-inquiry': 'Product Specification Inquiry',
      'catalog-request': 'Product Catalog Request',
      'partnership': 'Business Partnership',
      'other': 'Other Business Inquiry',
    }

    const subjectLabel = mailSubjectMap[subject] || 'New Business Inquiry'

    // Send email
    await transporter.sendMail({
      from: `"HaiLife Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[HaiLife Contact] ${subjectLabel} - ${name}`,
      text: `
New Inquiry from HaiLife Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
WhatsApp: ${whatsapp || 'Not provided'}

Subject: ${subjectLabel}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6b5438; border-bottom: 2px solid #6b5438; padding-bottom: 10px;">
            New Inquiry from HaiLife Website
          </h2>
          <div style="background-color: #faf8f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subjectLabel}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #6b5438; margin: 20px 0;">
            <h3 style="color: #6b5438; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-line; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
            This email was sent from the HaiLife website contact form.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { ok: false, error: err.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}

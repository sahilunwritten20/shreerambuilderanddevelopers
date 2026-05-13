const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Configure Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email service error:', error);
  } else {
    console.log('✓ Email service ready');
  }
});

// ────────────────────────────────────
// ROUTES
// ────────────────────────────────────

// Submit Site Visit Form
app.post('/api/submit-visit', async (req, res) => {
  const { name, phone, email, interest, date, message } = req.body;

  // Validate required fields
  if (!name || !phone || !email) {
    return res.status(400).json({ 
      success: false,
      error: 'Name, phone, and email are required' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid email address' 
    });
  }

  // Phone validation (basic - at least 10 digits)
  const phoneRegex = /^\d{10,}$/;
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    return res.status(400).json({ 
      success: false,
      error: 'Please enter a valid phone number' 
    });
  }

  try {
    // Format date for display
    const visitDate = date ? new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'To be confirmed';

    // ──────────────────────────────────
    // EMAIL 1: Confirmation to Customer
    // ──────────────────────────────────
    const customerEmail = {
      from: `"Shreeram Builders" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '✓ Site Visit Booking Confirmation - Shreeram Builders',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
            .header { background: linear-gradient(135deg, #c9a84c 0%, #8b7d3d 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; }
            .section { margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #c9a84c; }
            .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
            .cta-button { background: #c9a84c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .contact-info { background: #f5f5f5; padding: 15px; border-left: 4px solid #c9a84c; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Interest!</h1>
              <p>Site Visit Booking Confirmation</p>
            </div>
            
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              
              <p>We are thrilled to receive your interest in Shreeram Builders' premium residential and commercial spaces at Diamond Market, Palghar.</p>
              
              <div class="section">
                <h3 style="color: #c9a84c;">Your Booking Details:</h3>
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span>${name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span>${phone}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span>${email}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Unit Interested In:</span>
                  <span>${interest || 'To be discussed'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Preferred Visit Date:</span>
                  <span>${visitDate}</span>
                </div>
                ${message ? `<div class="detail-row"><span class="detail-label">Additional Message:</span><span>${message}</span></div>` : ''}
              </div>

              <div class="section">
                <h3 style="color: #c9a84c;">What Happens Next?</h3>
                <p>Our team will reach out to you at <strong>${phone}</strong> within 24 hours to:</p>
                <ul>
                  <li>Confirm your preferred visit date and time</li>
                  <li>Provide you with project details and floor plans</li>
                  <li>Answer any questions about the Diamond Market project</li>
                  <li>Schedule a personalized site tour</li>
                </ul>
              </div>

              <div class="contact-info">
                <strong>Have questions before the visit?</strong><br>
                <strong>Phone:</strong> +91 85919 82619<br>
                <strong>Email:</strong> ${process.env.CONTACT_EMAIL || 'info@shreerambuildersanddevelopers.com'}<br>
                <strong>Office Hours:</strong> Mon – Sun: 11:00 AM to 6:00 PM
              </div>

              <p>We look forward to showing you the perfect investment opportunity at Shreeram Builders!</p>
              
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                <strong>RERA Registered Project</strong><br>
                Registration No: P99000025416<br>
                Location: Diamond Market, Palghar
              </p>
            </div>

            <div class="footer">
              <p><strong>Shreeram Builders & Developers</strong></p>
              <p>"Building Dreams into Reality"</p>
              <p style="margin-top: 10px; color: #999;">This is an automated confirmation email. Please do not reply directly to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // ──────────────────────────────────
    // EMAIL 2: Notification to Admin
    // ──────────────────────────────────
    const adminEmail = {
      from: `"Shreeram Builders" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      cc: process.env.MANAGER_EMAIL || '',
      subject: `🔔 New Site Visit Request - ${name} (${phone})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
            .header { background: #c9a84c; color: white; padding: 20px; text-align: center; }
            .content { background: white; padding: 20px; }
            .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f5f5f5; font-weight: bold; }
            .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Site Visit Booking Request</h2>
            </div>

            <div class="content">
              <div class="alert">
                <strong>⚠️ ACTION REQUIRED:</strong> Contact customer at <strong>${phone}</strong> within 24 hours to confirm the appointment.
              </div>

              <h3>Customer Details:</h3>
              <table>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td><strong>Phone</strong></td>
                  <td><a href="tel:${phoneDigits}">${phone}</a></td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td><strong>Unit Interested</strong></td>
                  <td>${interest || 'Not specified'}</td>
                </tr>
                <tr>
                  <td><strong>Preferred Visit Date</strong></td>
                  <td>${visitDate}</td>
                </tr>
                ${message ? `<tr><td><strong>Additional Message</strong></td><td>${message}</td></tr>` : ''}
              </table>

              <h3>System Information:</h3>
              <p>
                <strong>Submission Time:</strong> ${new Date().toLocaleString('en-IN')}<br>
                <strong>Submission Source:</strong> Website Form (https://shreerambuildersanddevelopers.com)
              </p>

              <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <h4 style="margin-top: 0;">Quick Actions:</h4>
                <p>
                  📞 <a href="tel:${phoneDigits}">Call ${phone}</a><br>
                  📧 <a href="mailto:${email}">Email ${email}</a>
                </p>
              </div>
            </div>

            <div class="footer">
              <p>This is an automated notification from Shreeram Builders CRM System</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(customerEmail),
      transporter.sendMail(adminEmail)
    ]);

    console.log(`✓ Emails sent for booking: ${name} (${email})`);

    res.json({ 
      success: true, 
      message: 'Site visit request submitted successfully! Please check your email for confirmation.' 
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to submit your request. Please try again or contact us directly.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// ────────────────────────────────────
// ERROR HANDLING
// ────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ────────────────────────────────────
// START SERVER
// ────────────────────────────────────

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   Shreeram Builders Server Running   ║');
  console.log('╚════════════════════════════════════════╝\n');
  console.log(`✓ Server: http://localhost:${PORT}`);
  console.log(`✓ API: http://localhost:${PORT}/api/submit-visit\n`);
  console.log('Environment variables loaded:');
  console.log(`  - GMAIL_USER: ${process.env.GMAIL_USER ? '✓ Set' : '✗ Missing'}`);
  console.log(`  - GMAIL_PASSWORD: ${process.env.GMAIL_PASSWORD ? '✓ Set' : '✗ Missing'}`);
  console.log(`  - ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || 'Not configured'}\n`);
});

module.exports = app;
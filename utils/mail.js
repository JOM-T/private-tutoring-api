import { createTransport } from "nodemailer";
import 'dotenv/config'

export const mailTransport = createTransport ({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
});

export const registerUserMailTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Registration Confirmation</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        margin: 30px auto;
        padding: 30px;
        max-width: 600px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      h2 {
        color: #333333;
      }
      p {
        color: #555555;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Welcome to JOMAT!</h2>
      <p>Hello {{username}},</p>
      <p>Thank you for registering with our Private Tutoring Platform. Your account has been successfully created.</p>
      <p>We're excited to have you on board! You can now log in and start navigating through our platfrom for the best teachers.</p>

      <a class="btn" href="{{loginLink}}">Go to Dashboard</a>

      <p>If you did not sign up for this account, please ignore this email or contact our support.</p>

      <div class="footer">
        &copy; {{year}} JOMAT. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
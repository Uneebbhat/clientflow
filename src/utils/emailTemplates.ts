type EmailTemplateProps = {
  name: string;
};

export const signupEmailTemplate = (name: EmailTemplateProps) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: #f4f4f9;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .header {
          text-align: center;
          background: #4caf50;
          color: #ffffff;
          padding: 10px 0;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          text-align: left;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 0.8em;
          color: #888;
        }
        .cta-button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 15px;
          color: #ffffff;
          background: #4caf50;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Welcome to ClientFlow!</h1>
        </div>
        <div class="content">
          <p>Hi <b>${name}</b>,</p>
          <p>Thank you for signing up for <b>ClientFlow</b>! We're thrilled to have you onboard. 🎉</p>
          <p>Click below to explore:</p>
          <a href="https://ClientFlow.com" class="cta-button">Go to Dashboard</a>
          <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
        </div>
        <div class="footer">
          <p>© 2025 ClientFlow Inc. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

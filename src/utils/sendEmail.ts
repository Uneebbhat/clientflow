import nodemailer from "nodemailer";
import {
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_USER,
  HOST_NAME,
} from "@/config/constants";
import { signupEmailTemplate } from "@/utils/emailTemplates";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const sendEmail = async ({ to, subject, html, text }: EmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST_NAME as string,
      port: EMAIL_PORT as any,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"ClientFlow" <uneebbhatti3@gmail.com>',
      to,
      subject,
      html,
      text,
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;

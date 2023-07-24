import nodemailer from "nodemailer";
import htmlEmail from "./htmlEmail.js";

const sendEmail = async ({ to, url, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Mern Auth | Email Verification",
    html: htmlEmail({ url, text }),
  };

  const result = await transporter.sendMail(mailOptions);

  return result;
};

export default sendEmail;

import nodemailer from "nodemailer";
import htmlEmailReset from "./htmlEmailReset.js";

const sendEmailReset = async ({ to, url, text }) => {
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
    subject: "Mern Auth | Password Reset Request",
    html: htmlEmailReset({ url, text }),
  };

  const result = await transporter.sendMail(mailOptions);

  return result;
};

export default sendEmailReset;

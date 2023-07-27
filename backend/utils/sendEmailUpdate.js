import nodemailer from "nodemailer";
import htmlVerifyUpdatedEmail from "./htmlVerifyUpdatedEmail.js";

const sendEmailUpdate = async ({ to, url, text }) => {
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
    html: htmlVerifyUpdatedEmail({ url, text }),
  };

  const result = await transporter.sendMail(mailOptions);

  return result;
};

export default sendEmailUpdate;

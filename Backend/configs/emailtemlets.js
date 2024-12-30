import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Load .env file

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Secure SMTP port
  secure: true, // true for 465, false for 587
  auth: {
    user:process.env.EMAIL, // Use environment variable
    pass:process.env.EMAIL_PASSWORD, // Use environment variable
  },
});

console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);

const mailOptions = {
  from: process.env.EMAIL,
  to: 'akkiraj7531@gmail.com',
  subject: 'Test Email',
  text: 'Hello from Arjun Rajput!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log("Email sent successfully...!" + info.response);
  }
});

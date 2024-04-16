import nodemailer from "nodemailer";
import config from "../../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"PH Health Care" <thulk283@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    text: "Reset Your Password.", // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export default emailSender;

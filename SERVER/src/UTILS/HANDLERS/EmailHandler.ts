import nodemailer from "nodemailer";

export default function EmailHandler(
  email: string,
  subjet: string,
  content: string
) {
  const Transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  const Mail = {
    from: process.env.EMAIL_APP,
    to: email,
    subject: subjet,
    html: content,
  };

  return new Promise((resolve, reject) => {
    Transporter.sendMail(Mail, (Err, Info) => {
      if (Err) {
        reject(Err);
      } else {
        resolve(Info);
      }
    });
  });
}

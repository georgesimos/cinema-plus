const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE, // smtp.gmail.com  //in place of service use host...
  secure: process.env.MAIL_SECURED, // true
  port: process.env.MAIL_PORT, // 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.sendEMail = function(mailRequest) {
  console.log(transporter)
  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailRequest, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve('The message was sent!');
      }
    });
  });
};

module.exports = transporter;

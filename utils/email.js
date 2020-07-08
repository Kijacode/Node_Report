const nodemailer = require("nodemailer");
const env = require("../config/env");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "login",
    user: env.email,
    pass: env.password
  }
});

const sendEmails = (email, message,url) => {
    console.log("in email");
  var sen = "Sen";

  const mailOptions = {
    from: env.email,
    to: email,
    subject: "CAR RESERVERTION RECEIPT",
   text:   message,
    attachments: [
        {   // use URL as an attachment
            filename: 'FYP.pdf',
            path: url
        },,
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};



module.exports = sendEmails;
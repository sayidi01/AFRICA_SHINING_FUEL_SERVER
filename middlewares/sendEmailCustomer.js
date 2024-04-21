const nodemailer = require("nodemailer") ;

const PORT = process.env.PORT || 3000;

const sendCustomerEmail = (req, res, next) => {
    const token = req.accessToken;
    console.log("Request Body:", req.body);
  
    // config
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });
  
    // mail options
    const mailOptions = {
      from: "hicham13sayidi@gmail.com",
      to: req.body.email,
      subject: "Email validation",
      html: `<b>Hello , this is AFRICA SHINING FUEL </b> \Please validate by clicking on this link <a href=http://localhost:${PORT}/customer/email-validation?token=${token}>Validate your account</a> `,
    };
  
    transporter
      .sendMail(mailOptions)
      .then((info) => {
        return res.status(201).json({
          message: "Account created successfully",
          user: req.user
        });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  };

  module.exports = sendCustomerEmail;
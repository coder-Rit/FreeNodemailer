const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();


if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config.env" });
}
//connection to the data bas

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("ram ram");
});

app.post("/postEmail", async (req, res, next) => {
  /** testing account */

  if (!req.body.email) {
    return next(new ErrorHandler("please enter the email", 400));
  }

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    port: 587,
    host: "smtp.gmail.com",
    auth: {
      user: "postmantesting205@gmail.com", // generated ethereal user
      pass: "tsxldqljauuzquri", // generated ethereal password
    },
  });

  let message = {
    from: '"schoolOil" <postmantesting205@gmail.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "Message from smtp", // Subject line
    text: "", // plain text body
    html: `<div>
        Ram Ram.</sapn>
         </br>
         </br>
         
         
         <div>`, // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "OTP send to your email",
        status: true,
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
});

module.exports = app;

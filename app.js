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

app.post("/postEmail/visitedUserDetail", async (req, res, next) => {
  /** testing account */

  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail", // true for 465, false for other ports
      port: 587,
      host: "smtp.gmail.com",
      auth: {
        user: `${process.env.JIORIL_GMAIL}`, // generated ethereal user
        pass: `${process.env.JIORIL_GMAIL_PASS}`, // generated ethereal password
      },
    });

    let message = {
      from: `"JioRil", <${req.body.email}>`, // sender address
      to: `${process.env.JIORIL_GMAIL}`, // list of receivers
      subject: `${req.body.name} is visited at JioRil`, // Subject line
      text: "", // plain text body
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Response</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }
    
        .container {
          max-width: 600px;
          width: 100%;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          text-align: center;
        }
    
        .response {
          margin-top: 20px;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
    
        .response p {
          margin: 0;
          padding: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Contact Form Response</h1>
        <div class="response">
          <p><strong>Name:</strong> <span id="name">${req.body.name}</span></p>
          <p><strong>Email:</strong> <span id="email">${req.body.email}</span></p>
          <p><strong>Phone Number:</strong> <span id="phoneNumber">${req.body.phoneNumber}</span></p>
          <p><strong>Pin Code:</strong> <span id="pinCode">${req.body.pinCode}</span></p>
        </div>
      </div>
    
      
    </body>
    </html>
    
         
         `, // html body
    };

    transporter
      .sendMail(message)
      .then((info) => {
        return res.status(201).json({
          msg: "Query sended",
          status: true,
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  } catch (error) {
    console.log(error);
  }
});












app.post("/postEmail/userMessageQuery", async (req, res, next) => {
  /** testing account */

  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail", // true for 465, false for other ports
      port: 587,
      host: "smtp.gmail.com",
      auth: {
        user: `${process.env.JIORIL_GMAIL}`, // generated ethereal user
        pass: `${process.env.JIORIL_GMAIL_PASS}`, // generated ethereal password
      },
    });

    let message = {
      from: `"JioRil", <${req.body.email}>`, // sender address
      to: `${process.env.JIORIL_GMAIL}`,  // list of receivers
      subject: `${req.body.name} has a Query`, // Subject line
      text: "", // plain text body
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Response</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }
    
        .container {
          max-width: 600px;
          width: 100%;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          text-align: center;
        }
    
        .response {
          margin-top: 20px;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
    
        .response p {
          margin: 0;
          padding: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Contact Form Response</h1>
        <div class="response">
          <p><strong>Name:</strong> <span id="name">${req.body.name}</span></p>
          <p><strong>Email:</strong> <span id="email">${req.body.email}</span></p>
          <p><strong>Phone Number:</strong> <span id="phoneNumber">${req.body.phone}</span></p>
          <p><strong>Message:</strong> <span id="pinCode">${req.body.message}</span></p>
        </div>
      </div>
    
      
    </body>
    </html>
    
         
         `, // html body
    };

    transporter
      .sendMail(message)
      .then((info) => {
        return res.status(201).json({
          msg: "Query sended",
          status: true,
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;

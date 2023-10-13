const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const route = express.Router();
const port = process.env.PORT || 5000;
// app.use('/v1', route);



const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    secure: true,
});

app.post('/text-mail', (req, res) => {
    const { to, subject, text } = req.body;
    const mailData = {
        from: 'rishimarodia26@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


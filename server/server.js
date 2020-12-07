require('./config/config');
require('dotenv').config();

const express = require('express');
const app = express();
var nodemailer = require("nodemailer");

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("API PARA ENVIAR CORREOS LANDING PAGE A UDOCS.TEAM@GMAIL.COM")
});

app.post("/send-email", async(req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var phone = req.body.phone; 

    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    console.log(process.env.EMAIL);
    

    var mailOptions = {
        from: email,
        to: "udocs.team@gmail.com",
        subject: `Contacto U-DOCS - ${name}`,
        text: `${message} \n \n ==============================   \n Nombre: ${name} \n Telefono: ${phone} \n Correo del cliente: ${email} \n ==============================  `
    }
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        }

            res.status(200).json(req.body);
    });

    return 'El corre ha sido enviado correctamente';
})


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
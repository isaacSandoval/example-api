require('./config/config');

const express = require('express');
const app = express();
var nodemailer = require("nodemailer");

const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

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
            user: "udocs.team@gmail.com",
            pass: "udocs es el mejor"
        }
    });

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
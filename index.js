const express = require("express")
const app = express()
require("dotenv").config()

const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: true }));

app.post("/send_mail", cors(), async (req, res) => {
	res.send("minden ok")
	let { body } = req
	console.log(body.data.email,'email')
	const transport = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	})

	await transport.sendMail({
		from: process.env.MAIL_FROM,
		to: "ujvari.gyorgy@gmail.com",
		subject: `${body.data.name} ${body.data.prename}`,
		attachments:[
			{filename: 'image.jpg' , path: `${body.data.image}`}
		],
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Comanda</h2>
        <p>${body.data.email}</p>
        <p>${body.data.phone}</p>
        <p>${body.data.city}</p>
        <p>${body.data.street}</p>
        <p>${body.data.name}</p>
        <p>${body.data.prename}</p>
        <p>All the best, Darwin</p>
         </div>
    `
	})
})

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is listening on port 4000');
});
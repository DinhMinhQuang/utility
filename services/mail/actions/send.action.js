
const { Buffer } = require("buffer");
const net = require("net");
const tls = require("tls");
const readline = require("readline");
const { constants } = require("crypto");
const crypto = require("crypto");
const axios = require("axios");
const nodemailer = require("nodemailer");
const base64url = require("base64-url");
const fs = require("fs");

function generateDKIMSignature(fromAddress, privateKey) {
	const sign = crypto.createSign("RSA-SHA256");
	sign.update(`From:${fromAddress}`);
	const signature = sign.sign(privateKey, "base64");
	return signature;
}
module.exports = async function (ctx) {
	try {
		const { email, activeCode } = ctx.params;
		const smtpServer = "smtp.gmail.com";
		const smtpPort = 587;
		const gmailEmail = "minhquang.deverloper@gmail.com";
		const gmailPassword = "mrbg mvkg kbkt jpgk";
		const toEmail = email;
		const subject = "Test Email";
		const body = `Your active code is: ${activeCode}`;

		// const options = {
		// 	host: smtpServer,
		// 	port: smtpPort,
		// 	// rejectUnauthorized: false
		// };

		// const client = net.createConnection(options);

		// client.on("connect", () => {
		// 	console.log("Connected to Google SMTP server");

		// 	const secureSocket = tls.connect({
		// 		client,
		// 		host: smtpServer,
		// 		port: smtpPort,
		// 		// Additional TLS options can be added here
		// 	});
		// 	secureSocket.write("EHLO smtp.gmail.com\r\n");
		// 	secureSocket.write("STARTTLS\r\n");

		// 	// The following code assumes you have a TLS/SSL socket
		// 	// You may need to implement TLS/SSL depending on your setup

		// 	// Authenticate using your Google account
		// 	secureSocket.write("AUTH LOGIN\r\n");
		// 	secureSocket.write(Buffer.from(`${gmailEmail}`).toString("base64") + "\r\n");
		// 	secureSocket.write(Buffer.from(`${gmailPassword}`).toString("base64") + "\r\n");

		// 	// Specify sender and recipient
		// 	secureSocket.write(`MAIL FROM: <${gmailEmail}>\r\n`);
		// 	secureSocket.write(`RCPT TO: <${toEmail}>\r\n`);

		// 	// Add DKIM signature
		// 	const dkimPrivateKey = fs.readFileSync("private.key", "utf-8");
		// 	console.log(dkimPrivateKey);
		// 	const dkimSignature = generateDKIMSignature(gmailEmail, dkimPrivateKey);
		// 	console.log(dkimSignature);
		// 	secureSocket.write(`DKIM-Signature: ${dkimSignature}\r\n`);

		// 	// Start email data
		// 	secureSocket.write("DATA\r\n");
		// 	secureSocket.write("Subject: Your Subject\r\n");
		// 	secureSocket.write(`From: ${gmailEmail}\r\n`);
		// 	secureSocket.write(`To: ${toEmail}m\r\n`);
		// 	secureSocket.write("\r\n"); // Empty line before body
		// 	secureSocket.write("Your email body goes here.\r\n");
		// 	secureSocket.write(".\r\n"); // End of email data

		// 	// Quit the session
		// 	secureSocket.write("QUIT\r\n");
		// });

		// client.on("data", (data) => {
		// 	console.log(data.toString());
		// });

		// client.on("end", () => {
		// 	console.log("Disconnected from Google SMTP server");
		// 	client.destroy();
		// });

		// client.on("error", (error) => {
		// 	console.error("Error sending email:", error.message);
		// 	client.destroy();
		// });




		const mailOptions = {
			from: gmailEmail,
			to: toEmail,
			subject,
			text: body,
		};

		const transporter = nodemailer.createTransport({
			host: smtpServer,
			port: smtpPort,
			service: "gmail",
			auth: {
				user: gmailEmail,
				pass: gmailPassword,
			},
		});
		const transport = await transporter.sendMail(mailOptions);
		console.log(transport);
		return {
			code: 1,
			message: "Send mail succeed"
		};
	} catch (error) {
		console.log(error);
		return {};
	}
};

const axios = require("axios");
const nodemailer  = require("nodemailer");
module.exports = async function requestPost(url, body, headers = { Authorization: "" }) {
	console.log("request url => ", url);
	console.log("request body =>", JSON.stringify(body));
	try {
		const response = await axios.post(url, body, headers);
		return response;
	} catch (error) {
		console.log("Request error =>", JSON.stringify(error));
		return {
			code: 500,
			message: "Internal Server"
		};
	}
};

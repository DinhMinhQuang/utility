const axios = require("axios");
const encodedAuthorizationCode = "some%20encoded%20authorization%20code";

module.exports = async function getAccessToken() {
	const tokenUrl = process.env.TOKEN_URL;

	const requestData = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		code: decodeURIComponent(encodedAuthorizationCode),
		redirectUri : "http://localhost:3000",
		grant_type: "authorization_code",
	};

	try {
		const response = await axios.post(tokenUrl, requestData);
		if (response.code !== 200) {
			return {
				code: -1,
				message: "Get access token failed"
			};
		}
		return response.data;
	} catch (error) {
		console.error("Error getting access token:", error.message);
		throw error;
	}
};

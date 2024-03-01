const fetch = require("node-fetch");

module.exports = async function requestPost(url, body, headers = { Authorization: "" }) {
	console.log("request url => ", url);
	console.log("request body =>", JSON.stringify(body));
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...headers
			},
			body: JSON.stringify(body),
		});
		const res = await response.json();
		console.log("response =>", JSON.stringify(res));
		return res;
	} catch (error) {
		const errorBody = await error.response.text();
		console.log("Request error =>", JSON.stringify(errorBody));
		return {
			code: 500,
			message: "Internal Server"
		};
	}
};

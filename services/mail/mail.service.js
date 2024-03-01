"use strict";
const https = require("https");

const moleculerRabbitmq = require("moleculer-rabbitmq");

const queueMixin = moleculerRabbitmq({
	connection: process.env.RABBITMQ_URI,
	asyncActions: true
});

module.exports = {
	name: "mail",
	version: 1,
	mixins: [queueMixin],

	/**
	 * Settings
	 */
	settings: {
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		send: {
			queue: {
				amqp: {
					prefetch: 5
				},
				retry: {
					max_retry: 3,
					delay: (retryCount) => retryCount * 5000
				}
			},
			params: {
				email: "string",
				activeCode: "number"
			},
			handler: require("./actions/send.action")
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
		getAccessToken: require("./methods/getAccessToken.method"),
		requestAPI: require("./methods/request.method")
	},

	/**
	 * Service created lifecycle event handler
	 */
	async created() {
		// const request = https.request(baseUrl + apiRequest.path, apiRequest, (response) => {
		// 	let data = "";

		// 	response.on("data", (chunk) => {
		// 		data += chunk;
		// 	});

		// 	response.on("end", () => {
		// 		console.log("Response:", data);
		// 	});
		// });

		// Handle errors
		// request.on("error", (error) => {
		// 	console.error("Error:", error.message);
		// });

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		setTimeout(async () => {
			// const test = await this.broker.call("v1.mail.send.async", {
			// 	params: {
			// 		email: "strin",
			// 		activeCode: "String"
			// 	}
			// });
			// console.log(test);
			const test = await this.broker.call("v1.mail.send", {
				email: "letuyettrinh10c12@gmail.com",
				activeCode: 1231
			});
			console.log(test);
		}, 1000);
	},

	/**
	 * Service stopped lifecycle event handler
	 */

	// async stopped() {},

	async afterConnected() {
		console.log(test);
		this.logger.info("Connected successfully...");
	}
};

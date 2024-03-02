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
	},

	/**
	 * Service created lifecycle event handler
	 */
	async created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		// setTimeout(async () => {
		// 	const test = await this.broker.call("v1.mail.send", {
		// 		email: "letuyettrinh10c12@gmail.com",
		// 		activeCode: 1231
		// 	});
		// 	console.log(test);
		// }, 1000);
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

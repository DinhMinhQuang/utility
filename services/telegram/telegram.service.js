"use strict";
const moleculerRabbitmq = require("moleculer-rabbitmq");

const queueMixin = moleculerRabbitmq({
	connection: process.env.RABBITMQ_URI,
	asyncActions: true
});

module.exports = {
	name: "telegram",
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
		notification: {
			queue: {
				amqp: {
					prefetch: 5
				},
				retry: {
					max_retry: 3,

					delay: (retryCount) => retryCount * 5000
				},
				prefetch: 10
			},
			params: {
				message: "string|required"
			},
			handler: require("./actions/notification.action")
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() { },

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		setTimeout(async () => {
			// const test = await this.broker.call("v1.telegram.notification.async", {
			// 	params: {
			// 		message: "Testing app"
			// 	}
			// });
			// console.log(test);

		}, 10);
	},

	methods: {
		requestAPI: require("./methods/request.method")
	},

	/**
	 * Service stopped lifecycle event handler
	 */

	// async stopped() {},

	async afterConnected() {
		this.logger.info("Connected successfully...");
	}
};

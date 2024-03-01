const _ = require("lodash");

module.exports = async function (ctx) {
	try {
		const { message } = ctx.params;
		const requestAPI = await this.requestAPI(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
			chat_id: process.env.CHANNEL_ID,
			text: message
		});
		if (_.get(requestAPI, "ok", false) === false) {
			return {
				code: -1,
				message: _.get(requestAPI, "result.description", "Send notification error")
			};
		}
		return {
			code: 1,
			message: "Send notification succeed"
		};
	} catch (error) {
		return {};
	}
};

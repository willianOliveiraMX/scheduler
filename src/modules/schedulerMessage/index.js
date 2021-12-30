'use strict';

exports.plugin = {
	register: (plugin, options) => {
		const Controller = {
			message: require("./controller")
		};

		plugin.route([
			{
				method: "POST",
				path: "/create/schedulerMessage",
				config: Controller.message.createMessage
			}
		]);

		plugin.route([
			{
				method: "GET", 
				path: "/consulting/schedulerMessage/{messageId}",
				config: Controller.message.consultingMessage
			}
		]);
	},
    name: 'schedulerMessage'
};

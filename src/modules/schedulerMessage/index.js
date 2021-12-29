'use strict';

exports.plugin = {
	register: (plugin, options) => {
		const Controller = {
			message: require("./controller")
		};

        // plugin.route([
		// 	{
		// 		method: 'GET',
		// 		path: '/create/addressee',
		// 		config: Controller.addressee.getAllAddressee
		// 	}
		// ]);

		plugin.route([
			{
				method: 'POST',
				path: '/create/schedulerMessage',
				config: Controller.message.createMessage
			}
		]);
	},
    name: 'schedulerMessage'
};

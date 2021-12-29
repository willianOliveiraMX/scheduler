'use strict';

exports.plugin = {
	register: (plugin, options) => {
		const Controller = {
			addressee: require("./controller")
		};

        plugin.route([
			{
				method: 'GET',
				path: '/create/addressee',
				config: Controller.addressee.getAllAddressee
			}
		]);

		plugin.route([
			{
				method: 'POST',
				path: '/create/addressee',
				config: Controller.addressee.createAddressee
			}
		]);
	},
    name: 'addressee'
};

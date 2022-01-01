'use strict';

exports.plugin = {
	register: (plugin) => {
		const Controller = {
			addressee: require("./controller")
		};

        plugin.route([
			{
				method: 'GET',
				path: '/list/addressee/',
				config: Controller.addressee.getAllAddressee,
			},
			{
				method: 'POST',
				path: '/create/addressee',
				config: Controller.addressee.createAddressee,
			}
		]);
	},
    name: 'addressee'
};

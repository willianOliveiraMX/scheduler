'use strict';

const Hapi = require("@hapi/hapi");
const knex = require("knex");
const knexConfig = require("../knexfile");

exports.init = async () => {

    const database = knex({ ...knexConfig.development });
    
    const environmentDevelopment = process.argv.find(el => el === "development");

    const server = Hapi.server({
        port: 5000,
        ...(environmentDevelopment ? {host: "localhost"} : {})
    });

    await server.register([ 
        require("./modules/addressee"), 
        require("./modules/schedulerMessage")
    ]);

    server.decorate("request", "database", database);

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, reply) => {
            return reply.response({ content: "No content here" }) ;
        },
    });

    console.log('Server running on %s', server.info.uri);
    server.start();
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

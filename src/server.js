'use strict';

const Hapi = require("@hapi/hapi");
const knex = require("knex");
const knexConfig = require("../knexfile");

const init = async () => {

    const database = knex({ ...knexConfig.development });

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([ 
        require("./modules/addressee"), 
        require("./modules/schedulerMessage")
    ]);

    server.decorate("request", "database", database);

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            // Knex("message").select("text", "status").then((results) => {
            //     console.log(results);
            // })
            const a = await request.database.select("description").from("communication_type");
            console.log(a);
            return 'Hello World!';
        }
    });

    // server.route({
    //     method: "POST",
    //     path: "/create/schedulerMessage",
    //     handler: async (request, reply) => {
    //         return "Agendamento criado com sucesso!"
    //     }
    // });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
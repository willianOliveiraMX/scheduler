require("dotenv").config();
const environmentDevelopment = process.argv.find(el => el === "development");

module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'postgres',
        connection: {

            host: environmentDevelopment ? "localhost" : "db",

            user: environmentDevelopment ? process.env.DB_user : "postgres",
            password: environmentDevelopment ? process.env.DB_password : "admin123",

            database: environmentDevelopment ? process.env.DB_name : "SchedulerData",
            charset: 'utf8',
            ...(environmentDevelopment ? { port: process.env.DB_port } : {})
        }

    }

};

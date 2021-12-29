module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'postgres',
        connection: {

            host: 'localhost',

            user: 'postgres',
            password: '123',

            database: 'SchedulerData',
            charset: 'utf8',

        }

    }

};

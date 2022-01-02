module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'postgres',
        connection: {

            host: 'db',

            user: 'postgres',
            password: 'admin123',

            database: 'SchedulerData',
            charset: 'utf8',

        }

    }

};

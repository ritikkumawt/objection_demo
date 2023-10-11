 
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'demo1',
      user:     'postgres',
      password: 'bitcot'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
      seeds : {
directory : "./seeds"
      },
  }
};

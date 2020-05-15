require('@babel/register');

module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://learn_user:<learn_password>@/learn_development',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection:'postgres://learn_user:<learn_password>@127.0.0.1:5432/learn_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },
}

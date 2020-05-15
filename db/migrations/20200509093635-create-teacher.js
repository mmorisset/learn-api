const up = knex => {
  return Promise.all([
    knex.schema.createTable('teachers', table => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.string('avatar_url');
      table.timestamps(true, true);
    })
  ])
}
const down = knex => {
  return Promise.all([
    knex.schema.dropTable('teachers')
  ])
}

export {
  up,
  down
}

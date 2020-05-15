const up = knex => {
  return Promise.all([
    knex.schema.createTable('levels', table => {
      table.increments('id').primary();
      table.integer('index');
      table.string('color');
      table.timestamps(true, true);
    })
  ])
}
const down = knex => {
  return Promise.all([
    knex.schema.dropTable('levels')
  ])
}

export {
  up,
  down
}

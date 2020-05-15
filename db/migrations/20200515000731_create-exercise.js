const up = knex => {
  return Promise.all([
    knex.schema.createTable('exercises', table => {
      table.increments('id').primary();
      table.integer('index');
      table.string('word');
      table.specificType('syllable_propositions', 'text ARRAY');
      table.integer('level_id').references('levels.id').onDelete('cascade');
      table.timestamps(true, true);
    })
  ])
}
const down = knex => {
  return Promise.all([
    knex.schema.dropTable('exercises')
  ])
}

export {
  up,
  down
}

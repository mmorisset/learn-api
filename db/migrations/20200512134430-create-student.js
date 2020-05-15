const up = knex => {
  return Promise.all([
    knex.schema.createTable('students', table => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('avatar_url');
      table.integer('classroom_id').references('classrooms.id').onDelete('cascade');
      table.timestamps(true, true);
    })
  ])
}
const down = knex => {
  return Promise.all([
    knex.schema.dropTable('students')
  ])
}

export {
  up,
  down
}

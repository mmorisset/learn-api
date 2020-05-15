const up = knex => {
  return Promise.all([
    knex.schema.createTable('classrooms', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('code');
      table.string('avatar_url');
      table.integer('teacher_id').references('teachers.id').onDelete('cascade');
      table.timestamps(true, true);
    })
  ])
}
const down = knex => {
  return Promise.all([
    knex.schema.dropTable('classrooms')
  ])
}

export {
  up,
  down
}

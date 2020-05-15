const up = knex => {
  return Promise.all([
    knex.schema.createTable('exercise_grades', table => {
      table.increments('id').primary();
      table.integer('grade');
      table.integer('exercise_id').references('exercises.id').onDelete('cascade');
      table.integer('student_id').references('students.id').onDelete('cascade');
      table.timestamps(true, true);
    })
  ])
}
const down = knex => {
  return Promise.all([
    knex.schema.dropTable('exercise_grades')
  ])
}

export {
  up,
  down
}

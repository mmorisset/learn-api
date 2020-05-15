import '../index.js';
import Teacher from '../../app/models/teacher';
import Classroom from '../../app/models/classroom';
import * as classroomFactory from '../../spec/factories/classroom';

const seed = async function(knex) {
  await Classroom.query().delete();
  const teachers = await Teacher.query()
  await classroomFactory.createList(3, { teacherId: teachers[0].id });
  await classroomFactory.createList(2, { teacherId: teachers[1].id });
  await classroomFactory.createList(1, { teacherId: teachers[2].id });
};

export {
  seed
}

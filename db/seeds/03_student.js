import '../index.js';
import Classroom from '../../app/models/classroom';
import Student from '../../app/models/student';
import * as studentFactory from '../../spec/factories/student';

const seed = async function(knex) {
  await Student.query().delete();
  const classrooms = await Classroom.query();
  await studentFactory.createList(3, { classroomId: classrooms[0].id });
  await studentFactory.createList(2, { classroomId: classrooms[1].id });
  await studentFactory.createList(1, { classroomId: classrooms[2].id });
  await studentFactory.createList(3, { classroomId: classrooms[3].id });
  await studentFactory.createList(2, { classroomId: classrooms[4].id });
  await studentFactory.createList(2, { classroomId: classrooms[5].id });
};

export {
  seed
}

import '../index.js';
import * as teacherFactory from '../../spec/factories/teacher';
import Teacher from '../../app/models/teacher';

const seed = async function(knex) {
  await Teacher.query().delete();
  await teacherFactory.createList(3);
};

export {
  seed
}

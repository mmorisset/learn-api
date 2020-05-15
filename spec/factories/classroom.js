import faker from 'faker';
import regeneratorRuntime from "regenerator-runtime";

import Classroom from '../../app/models/classroom';
import * as teacherFactory from '../factories/teacher';

const data = async (props = {}) => {
  const defaultProps = {
    name: faker.random.word(),
  };

  if(!props.teacherId) {
    const teacher = await teacherFactory.create();
    defaultProps.teacherId = teacher.id;
  }

  return Object.assign({}, defaultProps, props);
};


const create = async (props) => {
  const classroomData = await data(props);
  return Classroom.query().insert(classroomData);
}

const createList = async (count, props) => {
  let classrooms = [];
  for (const num of Array(count)) {
    classrooms.push(await create(props));
  };
  return classrooms;
}

export {
  create,
  createList
}

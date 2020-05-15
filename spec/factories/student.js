import faker from 'faker';
import regeneratorRuntime from "regenerator-runtime";

import Student from '../../app/models/student';
import * as classroomFactory from '../factories/classroom';

const data = async (props = {}) => {
  const defaultProps = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  if(!props.classroomId) {
    const classroom = await classroomFactory.create();
    defaultProps.classroomId = classroom.id;
  }
  return Object.assign({}, defaultProps, props);
};


const create = async (props) => {
  const studentData = await data(props);
  return Student.query().insert(studentData);
}

const createList = async (count, props) => {
  let students = [];
  for (const num of Array(count)) {
    students.push(await create(props));
  };
  return students;
}

export {
  create,
  createList
}

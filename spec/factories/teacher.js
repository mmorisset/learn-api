import faker from 'faker';
import regeneratorRuntime from "regenerator-runtime";

import Teacher from '../../app/models/teacher';

const data = (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password()
  };
  return Object.assign({}, defaultProps, props);
};


const create = async (props) => {
  return Teacher.query().insert(data(props));
}

const createList = async (count, props) => {
  let teachers = [];
  for (const num of Array(count)) {
    teachers.push(await create(props));
  };
  return teachers;
}

export {
  create,
  createList
}

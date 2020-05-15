import faker from 'faker';
import regeneratorRuntime from "regenerator-runtime";

import Level from '../../app/models/level';

const data = (props = {}) => {
  const defaultProps = {
    color: faker.internet.color(),
    index: faker.random.number()
  };

  return Object.assign({}, defaultProps, props);
};


const create = async (props) => {
  return Level.query().insert(data(props));
}

const createList = async (count, props) => {
  let levels = [];
  for (const num of Array(count)) {
    levels.push(await create(props));
  };
  return levels;
}

export {
  create,
  createList
}

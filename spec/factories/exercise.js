import faker from 'faker';
import regeneratorRuntime from "regenerator-runtime";

import Exercise from '../../app/models/exercise';
import * as levelFactory from '../factories/level';

const data = async (props = {}) => {
  const defaultProps = {
    index: faker.random.number(),
    word: faker.random.word()
  };

  if(!props.levelId) {
    const level = await levelFactory.create();
    defaultProps.levelId = level.id;
  }

  return Object.assign({}, defaultProps, props);
};


const create = async (props) => {
  const exerciseData = await data(props);
  return Exercise.query().insert(exerciseData);
}

const createList = async (count, props) => {
  let exercises = [];
  for (const num of Array(count)) {
    exercises.push(await create(props));
  };
  return exercises;
}

export {
  create,
  createList
}

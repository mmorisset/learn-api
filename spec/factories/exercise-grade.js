import faker from 'faker';
import regeneratorRuntime from "regenerator-runtime";

import ExerciseGrade from '../../app/models/exercise-grade';
import * as studentFactory from '../factories/student';
import * as exerciseFactory from '../factories/exercise';

const data = async (props = {}) => {
  const defaultProps = {
    grade: faker.random.number(3),
  };

  if(!props.exerciseId) {
    const exercise = await exerciseFactory.create();
    defaultProps.exerciseId = exercise.id;
  }
  if(!props.studentId) {
    const student = await studentFactory.create();
    defaultProps.studentId = student.id;
  }

  return Object.assign({}, defaultProps, props);
};


const create = async (props) => {
  const exerciseGradeData = await data(props);
  return ExerciseGrade.query().insert(exerciseGradeData);
}

const createList = async (count, props) => {
  let exercisegrades = [];
  for (const num of Array(count)) {
    exercisegrades.push(await create(props));
  };
  return exercisegrades;
}

export {
  create,
  createList
}

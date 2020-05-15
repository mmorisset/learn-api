import '../index.js';
import Level from '../../app/models/level';
import Exercise from '../../app/models/exercise';
import * as exerciseFactory from '../../spec/factories/exercise';

const seed = async function(knex) {
  await Exercise.query().delete();
  const levels = await Level.query();
  await exerciseFactory.createList(3, { levelId: levels[0].id });
  await exerciseFactory.createList(4, { levelId: levels[1].id });
  await exerciseFactory.createList(5, { levelId: levels[2].id });
  await exerciseFactory.createList(6, { levelId: levels[3].id });

};

export {
  seed
}

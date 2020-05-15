import '../index.js';
import Level from '../../app/models/level';
import * as levelFactory from '../../spec/factories/level';

const seed = async function(knex) {
  await Level.query().delete();
  await levelFactory.createList(4);
};

export {
  seed
}

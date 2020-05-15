import knex from '../../db/index';
import knexCleaner from 'knex-cleaner';

global.beforeEach(async () => {
  await knexCleaner.clean(knex);
});

import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

import * as utils from '../app/scripts/utils';

const knexConfig = require('../knexfile');

const { Model } = require('objection');

console.log(knexConfig[utils.environement()]);

const knex = Knex({ ...knexConfig[utils.environement()], ...knexSnakeCaseMappers() });

if (utils.envConfig('KNEX_DEBUG')) {
  knex.on('query', data => { console.dir(data) })
}

Model.knex(knex);

export default knex;

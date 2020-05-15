import { Model } from 'objection';

import Base from './base';

class Level extends Base {
  static get tableName() {
    return 'levels';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['index', 'color'],

      properties: {
        id: { type: 'integer' },
        index: { type: 'integer' },
        color: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }

  static get relationMappings() {
    return {
      exercises: {
        relation: Model.HasManyRelation,
        modelClass: 'Exercise',
        join: {
          from: 'levels.id',
          to: 'exercises.levelId'
        }
      }
    }
  }
}

export default Level;

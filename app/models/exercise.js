import { Model } from 'objection';
import faker from 'faker';

import Base from './base';
import * as utils from '../scripts/utils';

class Exercise extends Model {
  static get tableName() {
    return 'exercises';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['index', 'word'],

      properties: {
        id: { type: 'integer' },
        word: { type: 'string', minLength: 1, maxLength: 255 },
        index: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    return {
      level: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Level',
        join: {
          from: 'exercises.levelId',
          to: 'levels.id'
        }
      },
      exerciseGrades: {
        relation: Model.HasManyRelation,
        modelClass: 'ExerciseGrade',
        join: {
          from: 'exercises.id',
          to: 'exercise_grades.exerciseId'
        }
      }
    }
  }

  async $beforeInsert() {
    await super.$beforeInsert();
    const wrongSyllables = [];
    for (const num of Array(4)) {
      wrongSyllables.push(utils.extractSyllables(faker.random.word()));
    }
    const correctSyllables = utils.extractSyllables(this.word);
    this.syllablePropositions = [...wrongSyllables, ...correctSyllables].flat();
  }
}

export default Exercise;
